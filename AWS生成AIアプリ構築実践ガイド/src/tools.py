from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from mypy_boto3_bedrock_agent_runtime import AgentsforBedrockRuntimeClient
    from mypy_boto3_bedrock_agent_runtime.type_defs import (
        KnowledgeBaseRetrievalResultTypeDef,
    )
    from mypy_boto3_bedrock_runtime import BedrockRuntimeClient
    from mypy_boto3_bedrock_runtime.type_defs import ToolConfigurationTypeDef


PROMPT_TEMPLATE = """あなたは親切なAIボットです。ユーザからの質問に対して<context></context>で与えられる情報に基づいて回答してください。
ただし質問への答えが<context></context>に書かれていない場合は正直にわかりませんと回答してください。
下記<question></question>がユーザからの質問です。
<question>
{question}
</question>
<context>
{context}
</context>
それでは回答を始めてください。"""

TOOL_TARGET_SCHEMA: ToolConfigurationTypeDef = {
    "tools": [
        {
            "toolSpec": {
                "name": "extract_answer_and_thinking",
                "description": "質問への回答と思考過程を分離する",
                "inputSchema": {
                    "json": {
                        "type": "object",
                        "properties": {
                            "answer": {"type": "string"},
                            "thinking": {"type": "string"},
                        },
                        "required": ["answer", "thinking"],
                    }
                },
            }
        }
    ],
}


def call_rag(
    question: str,
    knowledge_base_id: str,
    agents_runtime_client: AgentsforBedrockRuntimeClient,
    runtime_client: BedrockRuntimeClient,
    model_id: str = "us.meta.llama4-maverick-17b-instruct-v1:0",
) -> dict[str, str]:
    retrieval_result = _retrieve_context(
        question=question, knowledge_base_id=knowledge_base_id, agents_runtime_client=agents_runtime_client
    )
    context = "\n===\n".join([
        knowledge_base_retrieval_result["content"].get("text", "") for knowledge_base_retrieval_result in retrieval_result 
    ])
    prompt = PROMPT_TEMPLATE.format(question=question, context=context)

    try:
        response = runtime_client.converse(
            modelId=model_id, messages=[{"role": "user", "content": [{"text": prompt}]}], toolConfig=TOOL_TARGET_SCHEMA
        )
    except Exception as e:
        print(f"予期せぬエラーが発生しました: {e}")
        raise

    message = response["output"].get("message")
    if message:
        tool_use = message["content"][0].get("toolUse")
        if tool_use:
            result = {
                "answer": tool_use["input"]["answer"],
                "thinking": tool_use["input"]["thinking"],
                "context": context
            }
            return result
        else:
            raise ValueError(f"{model_id} からの message に toolUse が含まれませんでした: {message["content"][0]}")
    else:
        raise ValueError(f"{model_id} からのレスポンスに message が含まれませんでした: {response}")


def _retrieve_context(
    question: str, knowledge_base_id: str, agents_runtime_client: AgentsforBedrockRuntimeClient
) -> list[KnowledgeBaseRetrievalResultTypeDef]:
    try:
        response = agents_runtime_client.retrieve(
            knowledgeBaseId=knowledge_base_id,
            retrievalConfiguration={
                "vectorSearchConfiguration": {"overrideSearchType": "HYBRID", "numberOfResults": 3}
            },
            retrievalQuery={"text": question},
        )
        return response["retrievalResults"]
    except Exception as e:
        print(f"予期せぬエラーが発生しました: {e}")
        raise
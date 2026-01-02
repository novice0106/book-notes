from __future__ import annotations

import os
from typing import TYPE_CHECKING

import boto3
import streamlit as st
from dotenv import load_dotenv

from tools import call_rag

if TYPE_CHECKING:
    from mypy_boto3_bedrock_agent_runtime import AgentsforBedrockRuntimeClient
    from mypy_boto3_bedrock_runtime import BedrockRuntimeClient

load_dotenv("./.env")


def main(
    knowledge_base_id: str, agents_runtime_client: AgentsforBedrockRuntimeClient, runtime_client: BedrockRuntimeClient
):
    st.title("chatbot")
    st.sidebar.title("LLM の思考過程")
    thinking = st.sidebar.empty()
    st.sidebar.title("コンテキスト")
    context = st.sidebar.empty()

    if "messages" not in st.session_state:
        st.session_state.messages = []

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if question := st.chat_input("あなたの質問を入力してください"):
        st.session_state.messages.append({"role": "user", "content": question})
        with st.chat_message("user"):
            st.markdown(question)

        rag_response = call_rag(
            question=question,
            knowledge_base_id=knowledge_base_id,
            agents_runtime_client=agents_runtime_client,
            runtime_client=runtime_client,
        )

        with thinking.container():
            st.markdown(rag_response["thinking"])
        with context.container():
            st.markdown(rag_response["context"])

        st.session_state.messages.append({"role": "assistant", "content": rag_response["answer"]})
        with st.chat_message("assistant"):
            st.markdown(rag_response["answer"])


if __name__ == "__main__":
    knowledge_base_id = os.environ.get("KNOWLEDGE_BASE_ID")
    region = os.environ.get("REGION")
    if knowledge_base_id and region:
        agents_runtime_client = boto3.client("bedrock-agent-runtime", region_name=region)
        runtime_client = boto3.client("bedrock-runtime", region_name=region)
        main(
            knowledge_base_id=knowledge_base_id,
            agents_runtime_client=agents_runtime_client,
            runtime_client=runtime_client,
        )
    else:
        raise ValueError(
            f"環境変数がうまく読み込まれていません。\nKNOWLEDGE_BASE_ID: {knowledge_base_id}\nREGION: {region}"
        )

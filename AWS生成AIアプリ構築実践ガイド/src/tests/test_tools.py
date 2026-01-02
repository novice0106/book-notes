import os

import boto3
from dotenv import load_dotenv

from tools import call_rag

load_dotenv("../.env")


def test_call_rag():
    question = "東京都知事の給料はいくらですか？"
    knowledge_base_id = os.environ.get("KNOWLEDGE_BASE_ID")
    region = os.environ.get("REGION")
    if knowledge_base_id and region:
        agents_runtime_client = boto3.client("bedrock-agent-runtime", region_name=region)
        runtime_client = boto3.client("bedrock-runtime", region_name=region)
        response = call_rag(
            question=question,
            knowledge_base_id=knowledge_base_id,
            agents_runtime_client=agents_runtime_client,
            runtime_client=runtime_client,
        )
        print(f"call_rag の返り値: {response}")
        assert response.get("answer") != None
        assert response.get("thinking") != None
    else:
        raise ValueError(
            f"環境変数がうまく読み込まれていません。\nKNOWLEDGE_BASE_ID: {knowledge_base_id}\nREGION: {region}"
        )

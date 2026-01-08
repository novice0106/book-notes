from __future__ import annotations

import os

import requests
import streamlit as st
from dotenv import load_dotenv

from constants import API_SERVER_URL

load_dotenv("./.env")


def main(knowledge_base_id: str, region: str):
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

        try:
            params = {"question": question, "knowledge_base_id": knowledge_base_id, "region": region}
            rag_response = requests.get(API_SERVER_URL, params=params)
            if rag_response.status_code == 200:
                data = rag_response.json()
                with thinking.container():
                    st.markdown(data["thinking"])
                with context.container():
                    st.markdown(data["context"])

                st.session_state.messages.append({"role": "assistant", "content": data["answer"]})
                with st.chat_message("assistant"):
                    st.markdown(data["answer"])
        except Exception as e:
            st.error(f"予期せぬエラーが発生しました: {e}")


if __name__ == "__main__":
    knowledge_base_id = os.environ.get("KNOWLEDGE_BASE_ID")
    region = os.environ.get("REGION")
    if knowledge_base_id and region:
        main(knowledge_base_id=knowledge_base_id, region=region)
    else:
        raise ValueError(
            f"環境変数がうまく読み込まれていません。\nKNOWLEDGE_BASE_ID: {knowledge_base_id}\nREGION: {region}"
        )

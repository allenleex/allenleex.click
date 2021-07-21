# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask import jsonify, render_template, redirect, request, url_for
from app.api import blueprint
import jieba
import re


@blueprint.route('/api/test')
def test():
    return 'test api'


@blueprint.route('/api/words', methods=['GET', 'POST'])
def words():
    if request.method == 'POST':
        sentence = request.form['keyword']
        # seg_list = jieba.lcut(sentence.strip())
        stopwords = get_stopwords_list()
        sentence_depart = seg_depart(sentence)
        sentence_depart = move_stopwords(sentence_depart, stopwords)
        print(sentence_depart)
    else:
        seg_list = jieba.lcut("这是一段测试文字")
        print(seg_list)

    return jsonify({
        "data": sentence_depart
    })


# 创建停用词列表
def get_stopwords_list():
    # stopwords = [line.strip() for line in open('stopwords.txt', encoding='UTF-8').readlines()]
    stopwords = [
        "，", "。", " ", "？", "！", "~", "…", "、", "：", "；", "你", "我", "他", "她", ",", ".", ":", "?", "!", ";", "|", "/", "\\"
    ]
    return stopwords


# 对句子进行中文分词
def seg_depart(sentence):
    # 对文档中的每一行进行中文分词
    sentence_depart = jieba.lcut(sentence.strip())
    return sentence_depart


# 过滤数字
def remove_digits(input_str):
    punc = u'0123456789.'
    output_str = re.sub(r'[{}]+'.format(punc), '', input_str)
    return output_str


# 去除停用词
def move_stopwords(sentence_list, stopwords_list):
    # 去停用词
    out_list = []
    for word in sentence_list:
        if word not in stopwords_list:
            if not remove_digits(word):
                continue
            if word != '\t':
                out_list.append(word)
    return out_list

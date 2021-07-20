# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask import jsonify, render_template, redirect, request, url_for
from app.api import blueprint
import jieba


@blueprint.route('/api/test')
def test():
    return 'test api'


@blueprint.route('/api/words', methods=['GET', 'POST'])
def words():
    if request.method == 'POST':
        keyword = request.form['keyword']
        seg_list = jieba.lcut(keyword)
    else:
        seg_list = jieba.lcut("这是一段测试文字")
        print(seg_list)

    return jsonify({
        "data": seg_list
    })

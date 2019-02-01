var express = require('express');

function teg_replace(res) {
				return res.replace(/<[^>]+>/g, '')
}

module.exports = function teg_replace(res) {
				return res.replace(/<[^>]+>/g, '')
}
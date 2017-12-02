/**
 * @description 问卷调查
 * @author hilong.github.io
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ContentCategory = require('./ContentCategory');
var ContentTag = require('./ContentTag');
var AdminUser = require('./AdminUser');
var ContentSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    title: String,
    stitle: String,
    type: { type: String, default: "content" }, // 发布形式 默认为普通文档,约定 singer 为单页面文档
    categories: [{ type: String, ref: 'ContentCategory' }], //文章类别
    sortPath: String, //存储所有父节点结构
    tags: [{ type: String, ref: 'ContentTag' }], // 标签
    keywords: String,
    sImg: { type: String, default: "/upload/images/defaultImg.jpg" }, // 文章小图
    discription: String,
    date: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }, // 更新时间
    author: { type: String, ref: 'AdminUser' }, // 文档作者
    state: { type: Boolean, default: true },  // 是否在前台显示，默认显示
    isTop: { type: Number, default: 0 },  // 是否推荐，默认不推荐 0为不推荐，1为推荐
    clickNum: { type: Number, default: 1 },
    comments: String,
    commentNum: { type: Number, default: 0 }, // 评论数
    likeNum: { type: Number, default: 0 }, // 喜欢数
    likeUserIds: String, // 喜欢该文章的用户ID集合
    from: { type: String, default: '1' } // 来源 1为原创 2为转载

});


ContentSchema.set('toJSON', { getters: true, virtuals: true });
ContentSchema.set('toObject', { getters: true, virtuals: true });

ContentSchema.path('date').get(function (v) {
    return moment(v).startOf('hour').fromNow();
});
ContentSchema.path('updateDate').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm");
});

var Content = mongoose.model("Content", ContentSchema);

module.exports = Content;


var map = {
    _id:'',
	subject: '', // 所属问卷调查
	status:'', // 开放 opened、关闭 closed
	type: '', // 默认 single,multi
	title:'', // 题目标题
	items:[{
        title:'',
        value:''
    },{
        title:'',
        value:''
    }], // 题目选项
}
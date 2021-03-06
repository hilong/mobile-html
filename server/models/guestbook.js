/**
 * @description 学生主页的留言评论
 * @author hilong.github.io
 */
const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const GuestbookSchema = new Schema({
    toStudentId: String, // 所属于学生ID
    fromStudentId: String, // 来自于学生ID
    fromStudentName: String,// 来自于学生name
    subject: String, // 留言主题
    createDate:{ type: Date, default: Date.now }, // 创建时间
    content: String, // 留言内容
});
//{toStudentId:'101',fromStudentId:'102',fromStudentName:'test',subject:'test guestbook',createDate:'',content:'test guestbook'}
const Guestbook = mongoose.model('Guestbook', GuestbookSchema, 'guestbook');

module.exports = Guestbook;

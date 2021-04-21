 const moment=require('moment')

 function formatMessage(username,text)
 {
     return({
         username,
         text,
         time:moment().format("Do MMMM YYYY, h:mm:ss a")
     })
 }

 module.exports=formatMessage
$(function(){
    console.log(document.cookie)
    $('#login').click(function(event){
        event.preventDefault()
        var email = $('#email').val()
        var password = $('#password').val()
        // if (email == '') {
        //     alert('请输入邮箱!')
        // } else if (password == '') {
        //     alert('请输入密码!')
        // } else {

        // }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/reg',
            data: {
                email: email,
                password: password
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    alert(res.msg)
                }
            },
            error(err) {
                console.log(err)
            }
        })
        return false
    })
})

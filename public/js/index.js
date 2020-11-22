$(function(){
    $('#login').click(function(event){
        event.preventDefault()
        console.log($('#username').val(), $('#password').val())
        var username = $('#username').val()
        var password = $('#password').val()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/reg',
            data: {
                username: username,
                password: password
            },
            success(res) {
                console.log(res)
            },
            error(err) {
                console.log(err)
            }
        })
        return false
    })
})

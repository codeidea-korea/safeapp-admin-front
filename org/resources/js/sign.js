
$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$().ready(function() {
    $("#signupForm").validate({
        rules: {
            id: {
              required: true,
              minlength: 5
            },
            nick: {
                required: true,
              },
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            phone: {
              required: true,
              minlength: 11
            },
            agree: "required"
        },
        messages: {
            id: {
                required: "아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요.",
                minlength: "아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요."
            },
            nick: {
                required: "닉네임을 입력해주세요."
            },
            username: {
                required: "이름을 입력해주세요."
            },
            password: {
                required: "8~16자의 영어 대소문자, 숫자를 조합하여 입력해주세요.",
                minlength: "8~16자의 영어 대소문자, 숫자를 조합하여 입력해주세요."
            },
            confirm_password: {
                required: "비밀번호가 일치하지 않습니다.",
                minlength: "비밀번호가 일치하지 않습니다.",
                equalTo: "비밀번호가 일치하지 않습니다."
            },
            email: "이메일을 다시 확인해주세요.",
            phone: {
              required: "휴대폰 번호를 입력해주세요.",
              minlength: "휴대폰 번호를 입력해주세요."
            },
            agree: "서비스 이용약관에 동의해주세요."
        }
    });

    // propose username by combining first- and lastname
    $("#username").focus(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        if (firstname && lastname && !this.value) {
            this.value = firstname + "." + lastname;
        }
    });
});

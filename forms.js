window.onsubmit = function () {
    document.getElementById('formSubmit').disabled = true;
    return true;
};
window.onload = function () {
    $('#applicationAdd').trigger("reset");
}
$('#applicationAdd').one('submit', function () {
    $(this).find('input[type="submit"]').attr('disabled', 'disabled');
    document.getElementById('formSubmit').style = "cursor: wait;"
});

$(document).ready(function () {
    $('.js-example-basic-single').select2();
    $('.tooltip1').each(function (index, obj) {
        this.previousElementSibling.setAttribute('style', 'display:contents');
    });
});
var minuteAdd = NaN;
$.ajax({
    url: '/tr/e-exam/examTimeCheck/',
    data: {
        "user_id": USERID_HERE,
    },
    success: function (data) {
        if (data.minute) {
            minuteAdd = data.time;

        }
    }
});

function checkFiles(el) {
    var fup = el;
    var fileName = el.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === "pdf" || ext === "xlsx" || ext === "xls" || ext === "zip" || ext === "rar" || ext === "doc" || ext === "docx" || ext === "jpeg" || ext === "jpg" || ext === "PNG" || ext === "png") {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}
function selectChange(el, idList) {
    var dataVal = $(el).find(':selected').data('question');
    var b = idList.split(',').map(Number);
    if (dataVal) {
        document.getElementById(dataVal).style.display = 'block';
        document.getElementsByName('answerFields[' + dataVal + ']')[0].required = true;
        b.forEach(function (id) {
            if (id !== dataVal) {
                var aTag = document.getElementById('aTag' + id);
                if (typeof (aTag) != 'undefined' && aTag != null)
                    aTag.innerHTML = '';
                var element = document.getElementsByName(id)[0];
                if (typeof (element) != 'undefined' && element != null)
                    element.value = '';
                document.getElementById(id).style.display = 'none';
                document.getElementsByName('answerFields[' + id + ']')[0].value = '';
                if (document.getElementsByName('answerFields[' + id + ']')[0].parentElement.className === 'custom-file')
                    document.getElementsByName('answerFields[' + id + ']')[0].parentElement.children[1].innerHTML = 'Choose a file';
                document.getElementsByName('answerFields[' + id + ']')[0].required = false;
            }
        })
    } else {
        if (idList !== 'None') {
            b.forEach(function (id) {
                var aTag = document.getElementById('aTag' + id);
                if (typeof (aTag) != 'undefined' && aTag != null)
                    aTag.innerHTML = '';
                var element = document.getElementsByName(id)[0];
                if (typeof (element) != 'undefined' && element != null)
                    element.value = '';
                document.getElementById(id).style.display = 'none';
                document.getElementsByName('answerFields[' + id + ']')[0].value = '';
                if (document.getElementsByName('answerFields[' + id + ']')[0].parentElement.className === 'custom-file')
                    document.getElementsByName('answerFields[' + id + ']')[0].parentElement.children[1].innerHTML = 'Choose a file';
                document.getElementsByName('answerFields[' + id + ']')[0].required = false;
            })
        }
    }
}

function checkFilesImage(el) {
    var fup = el;
    var fileName = el.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === "jpg" || ext === "jpeg" || ext === "PNG" || ext === "png") {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.jpg, .png) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}

function checkFilesZip(el) {
    var fup = el;
    var fileName = el.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === 'zip' || ext === 'rar' || ext === '7zip') {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.zip,.rar,.7zip) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}

function checkFilesPdf(el) {
    var fup = el;
    var fileName = el.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === 'pdf') {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.pdf) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}
$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $(this).next('.custom-file-label').html(fileName);
});

function checkFilesExcel(el) {
    var fup = el;
    var fileName = el.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === "xlsx" || ext === "xls") {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.xlsx,.xls) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}

function checkFilesPowerPoint(el) {
    let fup = el;
    let fileName = el.value;
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === "pptx") {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.pptx) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}
function countWords(self, max, min) {
    let words = 0;
    if ((self.value.match(/\S+/g)) != null) {
        words = self.value.match(/\S+/g).length;
    }
    if (words > max) {
        let trimmed = $(self).val().split(/\s+/, max).join(" ");
        $(self).val(trimmed + " ");
    }
    else {
        $(self).parent().find('#wordInfo').text('Kalan Kelime Sayısı: ');
        $(self).parent().find('#word_left').text(max - words);
    }
    if (words < min) {
        $(self).parent().find('#wordInfo').text('Minimum Kelime Sayısı: ');
        $(self).parent().find('#word_left').text(min - words);
        document.getElementById('formSubmit').disabled = true;
    } else {
        document.getElementById('formSubmit').disabled = false;
    }
}
function checkFilesWord(el) {
    let fup = el;
    let fileName = el.value;
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext === "doc" || ext === "docx") {
        return true;
    } else {
        Swal.fire("Yalnızca izin verilen (.doc,.docx) uzantılarda dosya yükleyebilirsiniz!", "", "warning");
        fup.value = '';
        return false;
    }
}


setInterval(function () { makeTimer(); }, 0);
var first = false;
var first2 = false;
var first3 = false;
var stop = NaN;
var endTimeAdd = NaN;
var timeCheck = false;
function makeTimer() {
    var endTime = endTimeAdd ? endTimeAdd : new Date((1711479600) * 1000);
    endTime = (Date.parse(endTime) / 1000);
    var now = new Date();
    now = (Date.parse(now) / 1000);
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    if (days >= 0) {
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        if (days < "10") { days = "0" + days; }
        if (days == 0 && first === false) {
            first = true;
            $("#days").html('');
            document.getElementById('days').nextSibling.remove();
        }
        if (days != 0) {
            $("#days").html(days);
        }
        $("#hours").html(hours);
        $("#minutes").html(minutes);
        $("#seconds").html(seconds);
        if (days == 0 && hours == 0 && minutes < 5) {
            if (first2 === false) {
                first2 = true;
                $('#timeText').html('SÜRENİZ BİTMEK ÜZERE');
                document.getElementById('kronometre').style.background = 'linear-gradient(to right,#917f00,#ffee78)';
            }
        }
    } else {
        if (first3 === false) {
            first3 = true;
            $('#timeText').html('SÜRE BİTTİ');
            document.getElementById('kronometre').style.background = 'linear-gradient(to right, #910000, #ff7878)';
            $.ajax({
                url: '/tr/e-exam/examTimeCheck/',
                data: {
                    "user_id": USERID_HERE,
                },
                success: function (data) {
                    if (data.minute) {
                        minuteAdd = data.time;
                    }
                }
            });
        }
        if (minuteAdd && timeCheck === false) {
            endTimeAdd = minuteAdd;
            timeCheck = true;
            first2 = false;
            first3 = false;
            $('#timeText').html('KALAN SÜRE');
            document.getElementById('kronometre').style.background = 'linear-gradient(to right, #007991, #78ffd6)';
        } else {
            if (minutes <= 58) {
                $('input,textarea,select').attr('required', false);
                $('#formSubmit').click();
            }
        }
    }
}



$(".form-group .mt-2 .select ").change(function () {
    var id = $(".form-group .mt-2 .select ").find(":selected")[0].value;
    if (id) {
        id = parseInt(id);
        $.ajax({
            url: '/tr/program/apply/countCheck/',
            data: {
                'id': id
            },
            success: function (data) {
                if (data.count > 100) {
                    $(".btn-block").prop('disabled', true);
                    Swal.fire({
                        title: data.name,
                        text: data.messages,
                        icon: "error",
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Kapat'
                    });
                }
                else {
                    $(".btn-block").prop('disabled', false);
                }


            }, error: function (data) {
                console.log(data);
            }
        });

    }

});



$('input[type="text"], textarea').bind("cut copy paste", function (e) {
    e.preventDefault();
});

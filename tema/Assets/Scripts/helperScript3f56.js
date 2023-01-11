//var ieClipboardDiv = $('div[contenteditable]');

//var focusIeClipboardDiv = function() {
//    ieClipboardDiv.focus();
//    var range = document.createRange();
//    range.selectNodeContents((ieClipboardDiv.get(0)));
//    var selection = window.getSelection();
//    selection.removeAllRanges();
//    selection.addRange(range);
//};

//document.addEventListener('beforepaste', function() {
//    if (ieClipboardDiv .is(':focus')) {
//        focusIeClipboardDiv();
//    }
//}, true);

//document.addEventListener('paste', function(e) {
//    ieClipboardDiv.empty();
//    setTimeout(function() {
//        var html = ieClipboardDiv.html();
//        console.log(html);
//        // Do whatever you want with the html
//        //ieClipboardDiv.empty();
//        // Return focus here
//    }, 0);
//});

function triggerGeneralPopupMessageBox() {
    $('#btnDisplayPopup').click();
}
function triggerGeneralPopupMessageBoxWithResult(result) {
    $('#divResultMessage').html(result);
    $('#btnDisplayPopup').click();
}

$(document).ready(function () {

    initCheckInputInfo();
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    
    runToolTip();
    //$(".onlyNumber").keydown(function (e) {
    //    // Allow: backspace, delete, tab, escape, enter and .
    //    if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||
    //        // Allow: Ctrl+A
    //        (e.keyCode == 65 && e.ctrlKey === true) ||
    //        // Allow: home, end, left, right
    //        (e.keyCode >= 35 && e.keyCode <= 39)) {
    //        // let it happen, don't do anything
    //        return;
    //    }
    //    // Ensure that it is a number and stop the keypress
    //    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //        e.preventDefault();
    //    }
    //});
    $(".onlyNumber, .onlyNumber1").bind("input", function (event) {
        //var out = "";
        //var str = this.value;
        //for (var i = 0; i < str.length; i++) {
        //    if (/^\d+$/.test(str.charAt(i))) {
        //        out = out.concat(str.charAt(i));
        //    }
        //}
        //this.value = out;
        
        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^0-9]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length; i++) {
                this.value = this.value.replace(unexpectedChars[i], "");
            }
            this.setSelectionRange(start, end - 1);
        }
    });
    


    //$('div[contenteditable]').keydown(function (e) {
    //    // trap the return key being pressed
    //    if (e.keyCode === 13) {
    //        // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
    //        document.execCommand('insertHTML', false, '<br><br>');
    //        // prevent the default behaviour of return key pressed
    //        return false;
    //    }
    //});
    $("div[contenteditable]").bind("paste", function (e) {

        var content;

        if (window.clipboardData && window.clipboardData.getData) { // IE
            //content = window.clipboardData.getData('Text');
            //document.execCommand('insertText', false, content);
        }
        else if (e.originalEvent.clipboardData) {
            e.preventDefault();
            content = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand('insertText', false, content);
        }
        else if (window.clipboardData) {
            e.preventDefault();
            content = window.clipboardData.getData('Text');
            if (window.getSelection)
                window.getSelection().getRangeAt(0).insertNode(document.createTextNode(content));
        }

        //if (window.clipboardData && window.clipboardData.getData) { // IE
        //    console.log($(this)[0].outerHTML);
        //    //$(this).html(window.clipboardData.getData('Text').outerHTML);

        //    //var pastedData = window.clipboardData.getData('Text');

        //    //console.log(pastedData);
        //    //// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
        //    //document.execCommand('insertHTML', false, '<p><p>');
        //    //// prevent the default behaviour of return key pressed
        //    //return false;
        //    //e.preventDefault();

        //    //var text = window.clipboardData.getData('Text');
        //    //var tt = text.split('/n');
        //    //console.log(tt);
        //    //var result = $('<div></div>').append(text);

        //    //$(this).html(result.html());
        //    // replace all styles except bold and italic
        //    //$.each($(this).find("*"), function (idx, val) {

        //    //    var $item = $(val);
        //    //    if ($item.length > 0) {
        //    //        var saveStyle = {
        //    //            'font-weight': $item.css('font-weight'),
        //    //            'font-style': $item.css('font-style')
        //    //        };
        //    //        $item.removeAttr('style')
        //    //             .removeClass()
        //    //             .css(saveStyle);
        //    //    }
        //    //});

        //    //// remove unnecesary tags (if paste from word)
        //    //$(this).children('style').remove();
        //    //$(this).children('meta').remove()
        //    //$(this).children('link').remove();
        //}
    });

    //$('div[contenteditable]').on("paste",function () {
    //    var element = this;
    //    setTimeout(function () {
    //        var text = $(element).val();
    //        console.log(this);
    //    }, 100);
    //});

    $(document).on('keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        
        if (keyCode === 27 || keyCode === 13) {
            //$('div').each(function() {
            //    var className = $(this).attr('class');
            //    if (className == 'popupMessageIsDisplayed') {
            //        //$('.closePopup').click();
            //        document.getElementById("btnClosePopup").click();
            //        console.log('closePopup');
            //        //$('.mfp-ready').hide();
            //        //$('.mfp-container').hide();
            //        //$('.mfp-content').hide();
            //        //$.magnificPopup.close();
            //        $(this).removeClass('popupMessageIsDisplayed');

            //        return;
            //        //setTimeout(
            //        //          function () {
            //        //              $('.enablePopupAfterHide').show();
            //        //              $('.enablePopupAfterHide').removeClass('enablePopupAfterHide');
            //        //          }, 150);
            //    }
            //    else if (className == 'popupMessageIsDisplayedGoBack') {
            //        console.log('goBack');
            //        $(this).removeClass('popupMessageIsDisplayedGoBack');
            //        $('.goBack').click();
            //        return;
            //    }
            //});
            
            
            if ($('.enterOnConfirmPopup').hasClass('popupDisplayed')) {
                $('#spanAnswerYes').click();
                //$('#spanPackageIdAutomaticallyChangedAnswerYes').click();
            }
            $('.enterOnConfirmPopupSelf').click();
        }
    });
    
    $('input').keydown(function(event) {
        if($(this).val().length > $(this).attr('maxlength')) {
            event.preventDefault();
            return false;
        }
    });
    //$('input').keydown(function (event) {
    //    var inputVal = $(this).val().replace('-', '');
    //    var length = $(this).attr('maxlengthcreditCard');

    //    if (inputVal.length > length) {
    //        event.preventDefault();
    //        $(this).val(inputVal.substring(0, length));
    //        return false;
    //    }
    //});

    $(".onlyLetterAndSpaces").bind("input", function (event) {
        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^a-zA-Z\u00E7\u011F\u0131\u015F\u00F6\u00FC\u00C7\u011E\u0130\u015E\u00D6\u00DC ]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length;i++) {
                this.value = this.value.replace(unexpectedChars[i],"");
            }
            this.setSelectionRange(start, end-1);
        }
    });
    $(".onlyNumbersAndSpaces").bind("input", function (event) {
        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^0-9 ]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length; i++) {
                this.value = this.value.replace(unexpectedChars[i], "");
            }
            this.setSelectionRange(start, end - 1);
        }
    });
    $(".onlyNumbers").bind("input", function (event) {
        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^0-9]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length; i++) {
                this.value = this.value.replace(unexpectedChars[i], "");
            }
            this.setSelectionRange(start, end - 1);
        }
    });
    $(".onlyLetterAndNumber").bind("input", function (event) {
        //var out = "";
        //var str = this.value;
        //for (var i = 0; i < str.length; i++) {
        //    if (/[A-Za-z0-9]/.test(str.charAt(i))) {
        //        out = out.concat(str.charAt(i));
        //    }
        //}
        //this.value = out;
        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^A-Za-z0-9]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length; i++) {
                this.value = this.value.replace(unexpectedChars[i], "");
            }
            this.setSelectionRange(start, end - 1);
        }
    });
    $(".onlyLetterAndNumbersAndSpaces").bind("input", function (event) {
        //var out = "";
        //var str = this.value;
        //for (var i = 0; i < str.length; i++) {
        //    if (/[a-zA-Z0-9\u00E7\u011F\u0131\u015F\u00F6\u00FC\u00C7\u011E\u0130\u015E\u00D6\u00DC ]/.test(str.charAt(i))) {
        //        out = out.concat(str.charAt(i));
        //    }
        //}
        //this.value = out;

        var start = this.selectionStart,
            end = this.selectionEnd;
        var regxp = /[^a-zA-Z0-9\u00E7\u011F\u0131\u015F\u00F6\u00FC\u00C7\u011E\u0130\u015E\u00D6\u00DC ]/gi;
        var unexpectedChars = this.value.match(regxp);
        if (unexpectedChars != null && unexpectedChars.length > 0) {
            for (var i = 0; i < unexpectedChars.length; i++) {
                this.value = this.value.replace(unexpectedChars[i], "");
            }
            this.setSelectionRange(start, end - 1);
        }
    });
    
    function getCaret(el) {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = el.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    }
    function setCaret(elemId, caretPos) {
        var elem = document.getElementById(elemId);

        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    function clearAutoCompleteValues() {
        $("input[type='password'], input[type='text']").each(function () {
            if ($(this).attr("autocomplete") == "off") {
                $(this).val('');
            }
        });
    }

    setTimeout(clearAutoCompleteValues, 500);
    
    function validateMaxLength() {
        var text = $(this).val();
        var maxlength = $(this).data('maxlength');

        if (maxlength > 0) {
            $(this).val(text.substr(0, maxlength));
        }
    }
    $('.limitLength').keydown(validateMaxLength);
    $('.limitLength').keyup(validateMaxLength);
    
    $(".denyPaste").keydown(function (event) {
        if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
            event.preventDefault();
        }
    });
    $(".denyManualType").keydown(function (event) {
        event.preventDefault();
    });
});
function isTextSelected(input, isFullSelect) {
    if (typeof input.selectionStart == "number") {
        return (isFullSelect && input.selectionStart == 0 && input.selectionEnd == input.value.length)
            || (!isFullSelect && input.selectionEnd > 0)
        ;
    } else if (typeof document.selection != "undefined") {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}
function runToolTip(className) {
    if (className == undefined || className == '')
        className = 'showTooltip';
    // Tooltip only Text
    $('.' + className).hover(function () {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="masterTooltip"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('slow');
    }, function () {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.masterTooltip').remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.masterTooltip')
            .css({ top: mousey, left: mousex });
    });
    
}
function hasPopupMessageBox(response, uniqueIndicationKey, hiddenId) {
    var source = $('<div>' + response + '</div>');
    var hidden = source.find('#' + hiddenId);

    return hidden != undefined && hidden.val() === uniqueIndicationKey;
}

function actionHasPopupMessage(response, uniqueIndicationKey) {
    var source = $('<div>' + response + '</div>');
    var div = source.find('#divPopupMessageIndication').html();

    return div != undefined
        && div.indexOf(uniqueIndicationKey) >= 0;
    //return $('#divPopupMessageIndication') != undefined && $('#divPopupMessageIndication').html() != undefined
    //    && $('#divPopupMessageIndication').html().indexOf(uniqueIndicationKey) >= 0;
}
function clickElem(elemId) {
    $('#' + elemId).click();
}
function submitForm(formId) {
    $('#' + formId).submit();
}
function toggleBusyIndicator(isCancellable) {
    //$('#cancelBusy').hide();
    $('#divBusyIndicator').toggle();
    
    //if (isCancellable)
    //    $('#cancelBusy').delay(6000).fadeIn(2000);
}
//function resetForm(formElemId) {
//    $('#' + formElemId).find('input:text.clearInput, input:password.clearInput, input:file.clearInput, select.clearInput, textarea.clearInput').val('');
//    $('#' + formElemId).find('input:radio.clearInput, input:checkbox.clearInput').removeAttr('checked').removeAttr('selected');
//}
//function clearFormInputs(formId) {
//    $(':input', '#' + formId)
//        .removeAttr('checked')
//        .removeAttr('selected')
//        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
//        .val('');
//}
function ScrollToElement(elementId) {
    try {
        $('html, body').animate({
            scrollTop: $("#" + elementId).offset().top - 200 //200 give a bit more visual edge
        }, 1000);
    }catch(err) {
        
    }
}
function ScrollToElementBottom(elementId) {
    try {
        $('html, body').animate({
            scrollTop: $("#" + elementId).offset().top + ($("#" + elementId).outerHeight(true) - 400)
        }, 1000);
    } catch (err) {

    }
}

function ScrollToElementTop(elementId){
    try{
        $('html, body').animate({
            scrollTop: $("#" + elementId).offset().top
        }, 1000);
    } catch (err)
    {

    }
}

function isTckNoValid(val) {
    var result = false;

    if (val != '' && val.length == 11) {

        var Odds = 0;
        var Evens = 0;
        var T3 = 0;
        var C2 = 0;
        var D11 = 0;

        Odds += parseInt(val.substring(0, 1));
        Odds += parseInt(val.substring(2, 3));
        Odds += parseInt(val.substring(4, 5));
        Odds += parseInt(val.substring(6, 7));
        Odds += parseInt(val.substring(8, 9));

        Evens = Evens + parseInt(val.substring(1, 2));
        Evens = Evens + parseInt(val.substring(3, 4));
        Evens = Evens + parseInt(val.substring(5, 6));
        Evens = Evens + parseInt(val.substring(7, 8));

        var T1 = parseFloat((Odds * 3.0) + Evens);
        var C1 = parseFloat((10.0 - (T1 % 10.0)) % 10.0);
        var T2 = parseFloat(C1 + Evens);
        T3 = parseFloat((T2 * 3.0) + Odds);
        C2 = parseFloat((10.0 - (T3 % 10.0)) % 10.0);


        var D10 = parseInt(val.substring(9, 10));
        D11 = parseInt(val.substring(10, 11));

        result = C1 == D10 && C2 == D11;
    }
    return result;
}
function isTaxNoValid(val) {
    if (val != '' && val.length == 10) {
        var i, j, k, len;
        var sum, totalsum, checkdigit, calculatedcheckdigit;
        var multiplier = [512, 256, 128, 64, 32, 16, 8, 4, 2];

        totalsum = 0;

        for (i = 0; i < 9; i++) {
            sum = parseInt(val[i]) + 9 - i;
            if (sum > 9) sum -= 10;
            sum *= multiplier[i];
            if (sum > 0) {
                //k = sum;
                var strK = sum.toString();
                len = strK.length;
                sum = 0;
                for (j = 0; j < len; j++) {
                    sum += parseInt(strK[j]);
                }
                sum %= 9;

                sum = sum != 0 ? sum : 9;
            }
            totalsum += sum;
        }

        if (totalsum % 10 != 0) {
            calculatedcheckdigit = 10 - (totalsum % 10);
        }
        else {
            calculatedcheckdigit = 0;
        }

        checkdigit = parseInt(val[9]);
        return checkdigit == calculatedcheckdigit;
    }
    return false;
}
function initCheckInputInfo() {
    $(".checkInputInfo").each(function () {
        var inputInfoIbj = $(this).prev();
        var specialTexts = [];
        specialTexts.push("•");
        specialTexts.push("�");
        specialTexts.push("_");
        specialTexts.push("\\(");
        specialTexts.push("\\)");

        if ($(this).val() == '' || $(this).val() == 0) {
            inputInfoIbj.hide();
        }
        else {
            //console.log("init: " + $(this).val());
            inputInfoIbj.show();
        }

        $(this).focusout(function () {
            var value = $(this).val().replaceArrayAll(specialTexts, '');
            //console.log($(this).val() + " - " + value);
            if (value == '' || value == 0) {
                inputInfoIbj.hide();
            }
            else {
                inputInfoIbj.show();
            }
        });
        $(this).change(function () {
            var value = $(this).val().replaceArrayAll(specialTexts, '');
            //console.log("change: " + $(this).val());
            if ($(this).val() == '' || $(this).val() == 0) {
                inputInfoIbj.hide();
            }
            else {
                inputInfoIbj.show();
            }
        });
        $(this).on('input', function (e) {
            var value = $(this).val().replaceArrayAll(specialTexts, '');
            //console.log("input change: " + $(this).val());
            if (value == '' || value == 0) {
                inputInfoIbj.hide();
            }
            else {
                inputInfoIbj.show();
            }
        });
        $(this).keyup(function () {
            var value = $(this).val().replaceArrayAll(specialTexts, '');
            //console.log("keyup: " + $(this).val());
            if (value == '' || value == 0) {
                inputInfoIbj.hide();
            }
            else {
                inputInfoIbj.show();
            }
        });
    });
}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.replaceArrayAll = function (search, replacement) {
    var target = this;
    $.each(search, function (i, v) {
        target = target.replaceAll(search[i], replacement);//target.replace(new RegExp(search[i], 'g'), replacement);
    });
    return target;
};
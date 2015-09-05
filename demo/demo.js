/**
 * Created by chy on 15-8-27.
 */
$(document).ready(function(){
    var photo = $('#photo');

    function isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    var canvasSupported = isCanvasSupported();

    photo.on('change', function(event){
        if(!canvasSupported){
            return;
        }

        compress(event, function(base64Img, canvas, image){
            $("<b>Hello World!</b>").appendTo("body");
            $(canvas).appendTo("body");
            $(image).appendTo("body");
            //$.ajax({
            //    'url' : '/?s=free/upload',
            //    'type' : 'post',
            //    'data' : {'base64Img' : base64Img},
            //    'success' : function(ret){
            //        //拿到php传过来的图片地址
            //    }
            //});
        });
    });

    function compress(event, callback){
        var file = event.currentTarget.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {

            var image = $('<img/>');
            image.on('load', function () {
                var square = 700;
                var canvas = document.createElement('canvas');

                canvas.width = square;
                canvas.height = square;

                var context = canvas.getContext('2d');
                context.clearRect(0, 0, square, square);
                var imageWidth = 400;
                var imageHeight = 400;
                var offsetX = 0;
                var offsetY = 0;

                //if (this.width > this.height) {
                //    imageWidth = Math.round(square * this.width / this.height);
                //    imageHeight = square;
                //    offsetX = - Math.round((imageWidth - square) / 2);
                //} else {
                //    imageHeight = Math.round(square * this.height / this.width);
                //    imageWidth = square;
                //    offsetY = - Math.round((imageHeight - square) / 2);
                //}

                context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
                var data = canvas.toDataURL('image/jpeg');
                callback(data, canvas, image);
            });

            image.attr('src', e.target.result);
        };

        reader.readAsDataURL(file);
    }

});

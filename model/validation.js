function Validation() {
    this.kiemTraRong = function (valueInput, errorId, message) {
        if (valueInput === '') {
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = message;
            return false;
        }
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    };

    this.kiemTraDoDaiKyTu = function (valueInput, errorId, message, min, max) {
        if (valueInput.length >= min && valueInput.length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemTraKyTuChuoi = function (valueInput, errorId, message) {
        let letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemTraEmail = function (valueInput, errorId, message) {
        let letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemtraMatKhau = function (valueInput, errorId, message) {
        let letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemTraNgayVaoLam = function (valueInput, errorId, message) {
        let letter = /^\d{ 4 } [\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

        if (valueInput.match(letter)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemTraChucVu = function (selectId, errorId, message) {
        if (getEle(selectId).selectedIndex !== 0) {
            // true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };

    this.kiemTraMinMax = function (valueInput, errorId, message, min, max) {
        if (valueInput >= min && valueInput <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = message;
        return false;
    };



    this.kiemTraTaiKhoan = function (valueInput, errorId, message, listNV) {
        let status = listNV.some(function (itemNhanVien) {
            return valueInput === itemNhanVien.taiKhoanNV;
        });
        if (status) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = message;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = '';
        return true;
    };
}
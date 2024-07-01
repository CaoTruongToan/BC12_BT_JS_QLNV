function getEle(id) {
    return document.getElementById(id);
    // tạo hàm rút gon phần document.getElementById
}

let dsnv = new DanhSachNhanVien();
let validation = new Validation();
getLocalStorage();

// Hàm lấy thông tin NV từ người dùng nhập vào
function layThongTinNhanVien(isAdd) {
    let tkNV = getEle('tknv').value;
    let tenNV = getEle('name').value;
    let emailNV = getEle('email').value;
    let mkNV = getEle('password').value;
    let ngayVaoLam = getEle('datepicker').value;
    let luongCB = getEle('luongCB').value;
    let cvNV = getEle('chucvu').value;
    let gioLam = getEle('gioLam').value;

    let isValidation = true;

    // kiểm tra Tài khoản Nhân viên
    if (isAdd) {
        isValidation &=
            validation.kiemTraRong(tkNV, 'tbTKNV', '(*) Nhập tài khoản nhân viên')
            && validation.kiemTraDoDaiKyTu(tkNV, 'tbTKNV', '(*) Tài khoản:  Độ dài 4 - 6 ký tự', 4, 6)
            && validation.kiemTraTaiKhoan(tkNV, 'tbTKNV', '(*) Mã tài khoản đã tồn tại', dsnv.listNV);
    }

    // Kiểm tra tên Nhân viên
    isValidation &=
        validation.kiemTraRong(tenNV, 'tbTen', '(*) Nhập tên nhân viên')
        && validation.kiemTraKyTuChuoi(tenNV, 'tbTen', '(*) Tên là chữ ko phải là số');

    //Kiểm tra Email
    isValidation &=
        validation.kiemTraRong(emailNV, 'tbEmail', '(*) Nhập email nhân viên')
        && validation.kiemTraEmail(emailNV, 'tbEmail', '(*) Vui lòng nhập đúng định dạng Email');

    //Kiểm tra Mật khẩu
    isValidation &=
        validation.kiemTraRong(mkNV, 'tbMatKhau', '(*) Nhập Mật Khẩu')
        && validation.kiemtraMatKhau(mkNV, 'tbMatKhau', 'Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)');

    //Kiểm tra Ngày vào làm
    isValidation &=
        validation.kiemTraRong(ngayVaoLam, 'tbNgay', '(*) Chọn ngày vào làm')

    //Kiểm tra Chức vụ
    isValidation &= validation.kiemTraChucVu('chucvu', 'tbChucVu', '(*) Chọn chức vụ');

    //Kiểm tra lương Cơ bản
    isValidation &= validation.kiemTraRong(luongCB, 'tbLuongCB', '(*) Nhập lương cơ bản')
        && validation.kiemTraMinMax(luongCB, 'tbLuongCB', '(*) Lương cơ bản từ 1tr đến 20tr', 1000000, 20000000);

    //Kiểm tra Giờ Làm
    isValidation &= validation.kiemTraRong(gioLam, 'tbGiolam', '(*) Nhập giờ làm')
        && validation.kiemTraMinMax(gioLam, 'tbGiolam', '(*) Giờ làm trong tháng từ 80 đến 200', 80, 200);

    //fasle => return null
    //true => khởi tạo đối tượng SV
    if (!isValidation) return null;

    // tạo nhân viên từ lớp Đối tượng NhanVien
    let nhanVien = new NhanVien(
        tkNV,
        tenNV,
        emailNV,
        mkNV,
        ngayVaoLam,
        luongCB,
        cvNV,
        gioLam
    );
    // gọi Hàm tính Xếp Loại 
    nhanVien.tinhXepLoai();
    // gọi hàm tính Tổng Lương
    nhanVien.tinhTongLuong();
    return nhanVien;
}

/**
 * DOM tới button Thêm NV 
 */

getEle('btnThemNV').addEventListener('click', function (event) {
    // //chặn trang Load lại
    // event.preventDefault();
    // gọi hàm layThongTinNhanVien()
    let nhanVien = layThongTinNhanVien(true);

    // nếu khác null
    if (nhanVien) {
        dsnv.themNhanVien(nhanVien);

        // lưu dữ liệu
        setLocalStorage();
        renderTable(dsnv.listNV);
    }
});

// Show dữ liệu Nhân viên ra Table
function renderTable(dataDSNV) {
    let content = '';
    dataDSNV.forEach(function (itemNhanVien) {
        const currentFormat = new Intl.NumberFormat("vn-VN");
        content += `<tr>
        <td>${itemNhanVien.taiKhoanNV}</td>
        <td>${itemNhanVien.tenNhanVien}</td>
        <td>${itemNhanVien.emailNhanVien}</td>
        <td>${itemNhanVien.ngayVaoLam}</td>
        <td>${itemNhanVien.chucVuNhanVien}</td>
        <td>${currentFormat.format(itemNhanVien.tongLuong)}</td>
        <td>${itemNhanVien.xepLoai}</td>
        <td>
            <button class ="btn btn-info" onclick="suaThongTinNV('${itemNhanVien.tkNV}')" data-toggle="modal" data-target="#myModal">Sửa</button>
            <button class ="btn btn-danger" onclick="xoaNhanVien('${itemNhanVien.tkNV}')">Xóa</button>
        </td>
        <tr>`;
    });
    getEle('tableDanhSach').innerHTML = content;
}

/**
 * XÓA DỮ LIỆU NHÂN VIÊN
 */
function xoaNhanVien(tkNV) {
    dsnv._xoaNhanVien(tkNV);
    renderTable(dsnv.listNV);
    setLocalStorage();
}

/**
 * SỬA DỮ LIỆU NHÂN VIÊN
 */

function suaThongTinNV(tkNV) {
    let objectNV = dsnv._layThongTinNV(tkNV);
    if (objectNV) {

        // Dom tới các thẻ Input , hiển thị thông tin của NV đó ra
        getEle('tknv').value = objectNV.taiKhoanNV;
        getEle('tknv').disabled = true;

        getEle('name').value = objectNV.tenNhanVien;
        getEle('email').value = objectNV.emailNhanVien;
        getEle('password').value = objectNV.matKhauNhanVien;
        getEle('datepicker').value = objectNV.ngayVaoLam;
        getEle('luongCB').value = objectNV.luongCoBan;
        getEle('chucvu').value = objectNV.chucVuNhanVien;
        getEle('gioLam').value = objectNV.gioLamTrongThang;
    }
}

/**
 * CẬP NHẬT LẠI DỮ LIỆU NHÂN VIÊN
 */
getEle('btnCapNhat').addEventListener('click', function () {
    let nhanVien = layThongTinNhanVien(false);
    dsnv._capNhatNhanVien(nhanVien);
    renderTable(dsnv.listNV);
    setLocalStorage();
});
/**
 * TÌM KIẾM NHÂN VIÊN
 */

getEle('searchName').addEventListener('keyup', function () {
    let keyword = getEle('searchName').value;
    let mangTimKiem = dsnv._timKiemNhanVien(keyword);
    renderTable(mangTimKiem);

});



// Lưu dữ liệu vào LocalStorage
function setLocalStorage() {
    // convert json ==> string
    let dataString = JSON.stringify(dsnv.listNV);
    localStorage.setItem('DanhSachNhanVien', dataString);
}

// Lấy dữ liệu từ LocalStorage
function getLocalStorage() {
    //Kiểm tra dữ liệu từ LocalStorage : null, ""
    if (localStorage.getItem('DanhSachNhanVien')) {
        let dataString = localStorage.getItem('DanhSachNhanVien');
        // convert string ==> JSON
        let dataJSON = JSON.parse(dataString);

        dsnv.listNV = dataJSON
        // Hiển thị danh sách ra ngoài table
        renderTable(dsnv.listNV);
    }
}
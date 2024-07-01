// Khởi tạo lớp Đối tượng Nhân Viên
function NhanVien( tkNV, tenNV, emailNV, mkNV, ngayVaoLam, luongCB, cvNV, gioLam ) {
    this.taiKhoanNV = tkNV;
    this.tenNhanVien = tenNV;
    this.emailNhanVien = emailNV;
    this.matKhauNhanVien = mkNV;
    this.ngayVaoLam = ngayVaoLam;
    this.luongCoBan = luongCB;
    this.chucVuNhanVien = cvNV;
    this.gioLamTrongThang = gioLam;

    // Tạo phương thức tính Xếp loại Nhân viên
    this.xepLoai = '';
    this.tinhXepLoai = function () {
        if (this.gioLamTrongThang >= 192) {
            this.xepLoai = 'Xuất sắc';
        } else if (this.gioLamTrongThang >= 176) {
            this.xepLoai = 'Giỏi';
        } else if (this.gioLamTrongThang >= 160) {
            this.xepLoai = 'Khá';
        } else {
            this.xepLoai = 'Trung bình';
        }
        return this.xepLoai;
    };

    // Tạo phương thức tính tổng lương
    this.tongLuong = 0;
    this.tinhTongLuong = function () {
        if (this.chucVuNhanVien === 'Sếp') {
            this.tongLuong = parseFloat(this.luongCoBan * 3);
        } else if (this.chucVuNhanVien === 'Trưởng phòng') {
            this.tongLuong = parseFloat(this.luongCoBan * 2);
        } else if (this.chucVuNhanVien === 'Nhân viên') {
            this.tongLuong = parseFloat(this.luongCoBan);
        }
        return this.tongLuong;
    };
}
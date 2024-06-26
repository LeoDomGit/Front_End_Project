import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Icon from "../components/Icon";

function NotFound() {
  return (
    <>
      <Header />
      <div className="page-content">
        <section className="section-padding">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6">
                <Icon />
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2 className='text-primary'>Không tìm thấy nội dung yêu cầu </h2>
            <p>Không tìm thấy nội dung bạn yêu cầu. Vui lòng thử lại trong giây lát</p>
            <a href="/" className='btn btn-primary'>Quay về</a>
          </div>
        </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;
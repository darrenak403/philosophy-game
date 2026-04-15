import "./landing.css";

export function ResponsibleAIPage() {
  return (
    <section className="section responsible-ai-page">
      <div className="container container--narrow responsible-ai__container">
        <h1 className="responsible-ai__title mt-md">
          Các nội dung AI nhóm đã sử dụng
        </h1>

        <p className="body-large mt-lg">
          Trang này chỉ ghi nhận các hạng mục AI đã dùng trong đề tài. AI đóng
          vai trò hỗ trợ; toàn bộ nội dung học thuật cuối cùng do nhóm kiểm tra,
          chỉnh sửa và chịu trách nhiệm.
        </p>

        <div className="card mt-xl responsible-ai__card">
          <h2>Mục 1 - Dùng AI tạo document theo yêu cầu đề tài</h2>
          <ul className="responsible-ai__list">
            <li>
              <strong>Mục đích:</strong> tạo bản nháp cấu trúc tài liệu để nhóm
              triển khai nhanh và đầy đủ ý.
            </li>
            <li>
              <strong>Prompt chính:</strong> yêu cầu AI đề xuất bố cục tài liệu
              bám sát đề bài môn học, có phần mở đầu, nội dung chính và kết
              luận.
            </li>
            <li>
              <strong>Kết quả AI trả về:</strong> khung document và gợi ý nội
              dung theo từng mục.
            </li>
            <li>
              <strong>Phần nhóm chỉnh sửa/biên soạn:</strong> rà soát toàn bộ
              câu chữ, điều chỉnh thuật ngữ đúng giáo trình LLCT, bổ sung lập
              luận và ví dụ do nhóm tự viết.
            </li>
            <li>
              <strong>Kiểm chứng:</strong> đối chiếu thông tin với giáo trình
              LLCT, nghị quyết và nguồn chính thống trước khi đưa vào bản cuối.
            </li>
          </ul>
        </div>

        <div className="card mt-lg responsible-ai__card">
          <h2>Mục 2 - Dùng AI chuyển text thành voice</h2>
          <ul className="responsible-ai__list">
            <li>
              <strong>Mục đích:</strong> tạo voice thuyết minh cho phần trình
              bày nội dung.
            </li>
            <li>
              <strong>Prompt chính:</strong> yêu cầu AI đọc đúng nội dung văn
              bản, tốc độ rõ ràng, dễ nghe, phù hợp ngữ cảnh học thuật.
            </li>
            <li>
              <strong>Kết quả AI trả về:</strong> các phiên bản audio chuyển từ
              text.
            </li>
            <li>
              <strong>Phần nhóm chỉnh sửa/biên soạn:</strong> nghe lại từng
              đoạn, chọn bản phù hợp, chỉnh script đầu vào (ngắt câu, từ khóa,
              thuật ngữ) để đảm bảo đúng ý nghĩa nội dung.
            </li>
            <li>
              <strong>Kiểm chứng:</strong> đối chiếu audio với nội dung đã được
              nhóm xác thực để tránh sai lệch thông tin.
            </li>
          </ul>
        </div>

        <div className="card mt-lg responsible-ai__card">
          <h2>Cam kết học thuật của nhóm</h2>
          <ul className="responsible-ai__list">
            <li>
              Không để AI làm thay hoàn toàn bài tập; AI chỉ hỗ trợ tạo bản nháp
              và phương tiện trình bày.
            </li>
            <li>
              Có phân định rõ phần AI output và phần sinh viên tự chỉnh sửa/biên
              soạn trong quá trình hoàn thiện sản phẩm.
            </li>
            <li>
              Nhóm chịu trách nhiệm toàn bộ về tính chính xác, tính hợp lệ học
              thuật và nội dung nộp cuối cùng.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

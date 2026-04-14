import type { Round, MCLine } from '../types/game';

/* ===== MC Opening Hook (trước khi vào vòng 1) ===== */
export const MC_OPENING: MCLine[] = [
  { speaker: 'MC1', text: 'Hãy tưởng tượng… bạn không còn là sinh viên nữa…' },
  { speaker: 'MC1', text: 'Mà là CEO của một tập đoàn trị giá hàng trăm tỷ.', pause: true },
  { speaker: 'MC2', text: 'Mỗi quyết định bạn đưa ra… có thể khiến công ty tăng trưởng vượt bậc…' },
  { speaker: 'MC2', text: 'Hoặc sụp đổ chỉ trong vài tháng.', pause: true },
  { speaker: 'MC1', text: 'Thị trường không chờ bạn. Công nghệ không chờ bạn.' },
  { speaker: 'MC2', text: 'Và… cổ đông… cũng không chờ bạn.', pause: true },
  { speaker: 'MC1', text: 'Trong thế giới này… chỉ có một điều không bao giờ thay đổi…', pause: true },
  { speaker: 'MC2', text: 'Đó là: Thay đổi.' },
];

/* ===== MC Rules ===== */
export const MC_RULES: MCLine[] = [
  { speaker: 'MC2', text: 'Và bây giờ… chúng ta sẽ cùng trải nghiệm điều đó.' },
  { speaker: 'MC1', text: 'Trong trò chơi này, bạn sẽ trở thành CEO của một tập đoàn.' },
  { speaker: 'MC2', text: 'Bạn sẽ phải đưa ra quyết định trong những tình huống thực tế.' },
  { speaker: 'MC1', text: 'Mỗi quyết định… sẽ dẫn đến một hệ quả.' },
  { speaker: 'MC1', text: 'Mỗi vòng, bạn sẽ có 2 lựa chọn.' },
  { speaker: 'MC2', text: 'Quyết định đúng giúp công ty phát triển.' },
  { speaker: 'MC1', text: 'Quyết định sai khiến công ty suy yếu.' },
  { speaker: 'MC2', text: 'Nếu công ty rơi vào khủng hoảng…', pause: true },
  { speaker: 'MC1', text: 'Hội đồng cổ đông sẽ họp… và quyết định giữ hay sa thải CEO.' },
];

/* ===== MC Conclusion (sau vòng 5) ===== */
export const MC_CONCLUSION: MCLine[] = [
  { speaker: 'MC1', text: 'Qua toàn bộ quá trình này…' },
  { speaker: 'MC2', text: 'Chúng ta thấy rất rõ một điều.' },
  { speaker: 'MC1', text: 'Không ai giữ được vị trí của mình mãi mãi…' },
  { speaker: 'MC2', text: 'Nếu họ không thích nghi với sự thay đổi.', pause: true },
  { speaker: 'MC1', text: 'Dù CEO giỏi hay kém…' },
  { speaker: 'MC2', text: 'Dù công ty lớn hay nhỏ…' },
  { speaker: 'MC1', text: 'Sự thay đổi vẫn xảy ra. Đó là HẰNG SỐ.', pause: true },
  { speaker: 'MC2', text: '"Change is the only constant in life" — Heraclitus.' },
];

/* ===== 5 ROUNDS ===== */
export const ROUNDS: Round[] = [
  /* ─── VÒNG 1 — NỀN TẢNG PHÁT TRIỂN ─── */
  {
    id: 1,
    title: 'Nền tảng Phát triển',
    mcIntro: [
      { speaker: 'MC1', text: 'CEO đã sẵn sàng chưa?' },
      { speaker: 'MC1', text: 'Công ty của bạn đang hoạt động ổn định…' },
      { speaker: 'MC1', text: 'Nhưng tốc độ tăng trưởng ngày càng chậm lại.' },
      { speaker: 'MC2', text: 'Bạn sẽ làm gì?', pause: true },
    ],
    situation: 'Công ty ổn định nhưng tăng trưởng chậm dần. Thị trường đang thay đổi nhanh chóng.',
    choices: [
      {
        id: 'r1-a',
        text: 'Cải tiến từng bước, nâng cấp hệ thống dần dần',
        effect: { revenue: 5, morale: 10, innovation: 10, reputation: 5 },
        quality: 'good',
      },
      {
        id: 'r1-b',
        text: 'Giữ nguyên, công ty đang ổn định không cần thay đổi',
        effect: { revenue: -5, morale: -5, innovation: -15, reputation: -10 },
        quality: 'bad',
      },
    ],
    mcResults: {
      'r1-a': [
        { speaker: 'MC2', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC2', text: 'Cải tiến từng bước — công ty ổn định và bắt đầu tăng trưởng.' },
        { speaker: 'MC1', text: 'Đổi mới là chìa khóa để không bị bỏ lại phía sau.' },
      ],
      'r1-b': [
        { speaker: 'MC2', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC2', text: 'Giữ nguyên — công ty dần tụt lại phía sau.' },
        { speaker: 'MC1', text: 'Thế giới không chờ đợi ai. Đứng yên là thụt lùi.' },
      ],
    },
    mcTransition: [
      { speaker: 'MC2', text: 'Và chính những lựa chọn này… bắt đầu tạo ra vấn đề bên trong công ty.', pause: true },
    ],
  },

  /* ─── VÒNG 2 — MÂU THUẪN NỘI BỘ ─── */
  {
    id: 2,
    title: 'Mâu thuẫn Nội bộ',
    mcIntro: [
      { speaker: 'MC2', text: 'Marketing muốn tăng ngân sách để mở rộng.' },
      { speaker: 'MC2', text: 'Trong khi Tài chính muốn cắt giảm chi phí.' },
      { speaker: 'MC2', text: 'Mâu thuẫn xuất hiện.' },
      { speaker: 'MC1', text: 'Bạn sẽ xử lý như thế nào?', pause: true },
    ],
    situation: 'Hai bộ phận lớn nhất trong công ty đang mâu thuẫn về chiến lược ngân sách.',
    choices: [
      {
        id: 'r2-a',
        text: 'Khai thác mâu thuẫn — tổ chức tranh luận, tìm giải pháp tốt hơn',
        effect: { revenue: 5, morale: 5, innovation: 15, reputation: 10 },
        quality: 'good',
      },
      {
        id: 'r2-b',
        text: 'Dập tắt — ra lệnh cả hai im lặng, CEO quyết định',
        effect: { revenue: 0, morale: -15, innovation: -10, reputation: -5 },
        quality: 'bad',
      },
    ],
    mcResults: {
      'r2-a': [
        { speaker: 'MC1', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC1', text: 'Khai thác mâu thuẫn — công ty tìm ra hướng đi tốt hơn.' },
        { speaker: 'MC2', text: 'Mâu thuẫn không phải kẻ thù. Nó là động lực phát triển.' },
      ],
      'r2-b': [
        { speaker: 'MC1', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC1', text: 'Dập tắt — ổn định tạm thời nhưng mất cơ hội phát triển.' },
        { speaker: 'MC2', text: 'Khi mâu thuẫn bị ép xuống… nó sẽ bùng nổ sau đó.' },
      ],
    },
    mcTransition: [
      { speaker: 'MC1', text: 'Nhưng trong khi nội bộ còn chưa ổn định…' },
      { speaker: 'MC2', text: 'Thị trường bên ngoài lại tiếp tục thay đổi.', pause: true },
    ],
  },

  /* ─── VÒNG 3 — ÁP LỰC THỊ TRƯỜNG ─── */
  {
    id: 3,
    title: 'Áp lực Thị trường',
    mcIntro: [
      { speaker: 'MC1', text: 'Một công nghệ mới xuất hiện: AI.' },
      { speaker: 'MC1', text: 'Các đối thủ đã bắt đầu áp dụng.' },
      { speaker: 'MC2', text: 'Bạn sẽ làm gì?', pause: true },
    ],
    situation: 'AI đang thay đổi toàn bộ ngành. Đối thủ đã bắt đầu áp dụng, nhân viên hoang mang.',
    choices: [
      {
        id: 'r3-a',
        text: 'Áp dụng AI ngay — đào tạo nhân viên, tái cấu trúc quy trình',
        effect: { revenue: -5, morale: 5, innovation: 20, reputation: 15 },
        quality: 'good',
      },
      {
        id: 'r3-b',
        text: 'Chờ đợi — xem đối thủ thất bại trước rồi mình học hỏi',
        effect: { revenue: -10, morale: -10, innovation: -15, reputation: -10 },
        quality: 'bad',
      },
    ],
    mcResults: {
      'r3-a': [
        { speaker: 'MC2', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC2', text: 'Áp dụng AI — rủi ro nhưng có cơ hội đi trước.' },
        { speaker: 'MC1', text: 'Sự thay đổi luôn có rủi ro. Nhưng không thay đổi rủi ro hơn.' },
      ],
      'r3-b': [
        { speaker: 'MC2', text: 'Chúng ta vừa thấy một điều rất rõ ràng.' },
        { speaker: 'MC2', text: 'Chờ đợi — an toàn nhưng có thể mất cơ hội mãi mãi.' },
        { speaker: 'MC1', text: 'Thị trường không chờ ai. Kẻ chần chừ sẽ bị bỏ lại.' },
      ],
    },
    mcTransition: [
      { speaker: 'MC2', text: 'Và sau tất cả những quyết định đó…', pause: true },
      { speaker: 'MC1', text: 'Hệ quả bắt đầu xuất hiện.' },
    ],
  },

  /* ─── VÒNG 4 — KHỦNG HOẢNG (CAO TRÀO) ─── */
  {
    id: 4,
    title: 'Khủng hoảng',
    mcIntro: [
      { speaker: 'MC2', text: 'Áp lực tăng cao. Nhân sự quá tải.' },
      { speaker: 'MC2', text: 'Doanh thu giảm. Niềm tin thị trường suy giảm.' },
      { speaker: 'MC1', text: 'Công ty đang ở ngã ba đường.', pause: true },
      { speaker: 'MC2', text: 'Bạn sẽ quyết định thế nào?', pause: true },
    ],
    situation: 'Khủng hoảng toàn diện. Nhân sự quá tải, doanh thu giảm, thị trường mất niềm tin.',
    choices: [
      {
        id: 'r4-a',
        text: 'Tái cấu trúc toàn bộ — chấp nhận đau nhưng để phát triển',
        effect: { revenue: -10, morale: -5, innovation: 15, reputation: 10 },
        quality: 'good',
      },
      {
        id: 'r4-b',
        text: 'Cắt giảm chi phí khẩn cấp — sa thải nhân viên, đóng dự án',
        effect: { revenue: 5, morale: -20, innovation: -15, reputation: -10 },
        quality: 'bad',
      },
    ],
    mcResults: {
      'r4-a': [
        { speaker: 'MC1', text: 'Tái cấu trúc — đau đớn nhưng mở ra cơ hội mới.' },
        { speaker: 'MC2', text: 'Phủ định cái cũ để xây dựng cái mới. Đó là tiến hóa.' },
      ],
      'r4-b': [
        { speaker: 'MC1', text: 'Cắt giảm khẩn cấp — cứu được tài chính nhưng mất nhân tài.' },
        { speaker: 'MC2', text: 'Khi chỉ nghĩ đến sống sót… bạn đã từ bỏ tương lai.' },
      ],
    },
    mcTransition: [
      { speaker: 'MC1', text: 'Dù tốt hay xấu…', pause: true },
      { speaker: 'MC2', text: 'Hội đồng cổ đông buộc phải can thiệp.' },
    ],
  },

  /* ─── VÒNG 5 — HỌP CỔ ĐÔNG (CAO TRÀO CUỐI) ─── */
  {
    id: 5,
    title: 'Họp Cổ đông',
    mcIntro: [
      { speaker: 'MC1', text: 'Câu hỏi đặt ra là…' },
      { speaker: 'MC1', text: 'CEO hiện tại… có còn phù hợp nữa hay không?' },
      { speaker: 'MC2', text: 'Chúng ta sẽ cùng quyết định.', pause: true },
    ],
    situation: 'Hội đồng cổ đông họp. CEO hiện tại đang chờ phán quyết cuối cùng.',
    choices: [
      {
        id: 'r5-a',
        text: 'Giữ CEO — tin tưởng năng lực thích nghi',
        effect: { revenue: 5, morale: 10, innovation: 5, reputation: 5 },
        quality: 'good',
      },
      {
        id: 'r5-b',
        text: 'Sa thải CEO — cần máu mới cho giai đoạn mới',
        effect: { revenue: 0, morale: -5, innovation: 0, reputation: 0 },
        quality: 'bad',
      },
    ],
    mcResults: {
      'r5-a': [
        { speaker: 'MC2', text: 'CEO được giữ lại. Nhưng dưới áp lực cực lớn.' },
        { speaker: 'MC1', text: 'Chỉ cần một sai lầm nữa… và câu chuyện sẽ khác.' },
      ],
      'r5-b': [
        { speaker: 'MC2', text: 'CEO chính thức bị thay thế.' },
        { speaker: 'MC1', text: 'Nhưng điều đó không có nghĩa là thất bại…' },
        { speaker: 'MC2', text: 'Mà là quy luật — cái mới thay thế cái cũ.' },
      ],
    },
    mcTransition: [
      { speaker: 'MC2', text: 'Dù kết quả là gì…' },
      { speaker: 'MC1', text: 'Cuối cùng… CEO vẫn sẽ bị thay thế bởi người phù hợp hơn.', pause: true },
      { speaker: 'MC2', text: 'Đó là Hằng Số của sự Biến Đổi.' },
    ],
  },
];

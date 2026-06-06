chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension đã được cài đặt hoặc cập nhật:', details.reason);
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension đã khởi động cùng trình duyệt.');
});

// Có thể thêm các listener khác nếu cần

// Hiển thị mã màu HEX khi chọn màu
const colorPicker = document.getElementById('colorPicker');
const colorHex = document.getElementById('colorHex');
const applyBtn = document.getElementById('applyBtn');
const resetBtn = document.getElementById('resetBtn');
const statusDiv = document.getElementById('status');

// Cập nhật text hex khi thay đổi màu
colorPicker.addEventListener('input', (e) => {
  colorHex.textContent = e.target.value;
});

// Hàm hiển thị trạng thái
function showStatus(message) {
  statusDiv.textContent = message;
  statusDiv.classList.add('show');
  setTimeout(() => {
    statusDiv.classList.remove('show');
  }, 1500);
}

// Hàm chung để đổi màu trang hiện tại
async function changePageBackground(color) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      showStatus('Không tìm thấy tab!');
      return;
    }
    
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBackgroundColor,
      args: [color]
    });
    showStatus('Đã áp dụng!');
  } catch (error) {
    console.error('Lỗi:', error);
    showStatus('Lỗi: ' + error.message);
  }
}

// Hàm được inject vào trang web
function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// Sự kiện nút "Áp dụng ngay"
applyBtn.addEventListener('click', () => {
  const selectedColor = colorPicker.value;
  changePageBackground(selectedColor);
});

// Reset về trắng
resetBtn.addEventListener('click', () => {
  colorPicker.value = '#ffffff';
  colorHex.textContent = '#ffffff';
  changePageBackground('#ffffff');
});

//contacts.html tabs
function showTab(tabId) {
    const allTabsContent = document.querySelectorAll('.tab-content');
    allTabsContent.forEach(content => content.classList.remove('active'));
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    const activeTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
    activeTab.classList.add('active');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    showTab('telegram');
  });

// Text analyzer functionality

document.addEventListener('DOMContentLoaded', () => {
  initTextAnalyzer();
});

const initTextAnalyzer = () => {
  const textInput = document.getElementById('text-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultTabs = document.querySelectorAll('.result-tab');
  const resultPanels = document.querySelectorAll('.result-panel');
  
  if (!textInput || !analyzeBtn) return;
  
  // Handle tab switching
  resultTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.getAttribute('data-tab');
      
      // Update active tab
      resultTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active panel
      resultPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${tabType}-panel`) {
          panel.classList.add('active');
        }
      });
    });
  });
  
  // Analyze text when button is clicked
  analyzeBtn.addEventListener('click', () => {
    const text = textInput.value;
    
    if (text.trim() === '') {
      alert('Please enter text to analyze.');
      return;
    }
    
    analyzeText(text);
  });
};

// Function to analyze text and display results
const analyzeText = (text) => {
  // Basic stats
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  const wordCount = text.trim().split(/\s+/).filter(word => word !== '').length;
  const spaceCount = (text.match(/\s/g) || []).length;
  const newlineCount = (text.match(/\n/g) || []).length;
  const specialCharCount = (text.match(/[^\w\s]/g) || []).length;
  
  // Update basic stats in the UI
  document.getElementById('letter-count').textContent = letterCount;
  document.getElementById('word-count').textContent = wordCount;
  document.getElementById('space-count').textContent = spaceCount;
  document.getElementById('newline-count').textContent = newlineCount;
  document.getElementById('special-count').textContent = specialCharCount;
  
  // Pronouns analysis
  const pronouns = {
    'personal': ['i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'we', 'us', 'our', 'ours', 'they', 'them', 'their', 'theirs'],
    'possessive': ['my', 'mine', 'your', 'yours', 'his', 'her', 'hers', 'its', 'our', 'ours', 'their', 'theirs'],
    'reflexive': ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves'],
    'demonstrative': ['this', 'that', 'these', 'those'],
    'interrogative': ['who', 'whom', 'whose', 'which', 'what'],
    'relative': ['who', 'whom', 'whose', 'which', 'that'],
    'indefinite': ['all', 'another', 'any', 'anybody', 'anyone', 'anything', 'both', 'each', 'either', 'everybody', 'everyone', 'everything', 'few', 'many', 'most', 'neither', 'nobody', 'none', 'nothing', 'one', 'other', 'others', 'several', 'some', 'somebody', 'someone', 'something', 'such']
  };
  
  // Prepositions
  const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'but', 'by', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'];
  
  // Articles
  const articles = ['a', 'an', 'the'];
  
  // Convert text to lowercase and split into words
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Count pronouns by type
  const pronounCounts = {};
  for (const type in pronouns) {
    pronounCounts[type] = words.filter(word => pronouns[type].includes(word)).reduce((counts, word) => {
      counts[word] = (counts[word] || 0) + 1;
      return counts;
    }, {});
  }
  
  // Count prepositions
  const prepositionCounts = words.filter(word => prepositions.includes(word)).reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {});
  
  // Count articles
  const articleCounts = words.filter(word => articles.includes(word)).reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {});
  
  // Update pronouns panel
  const pronounsListEl = document.getElementById('pronouns-list');
  pronounsListEl.innerHTML = '';
  
  for (const type in pronounCounts) {
    const typeEntries = Object.entries(pronounCounts[type]);
    if (typeEntries.length > 0) {
      const typeHeading = document.createElement('h4');
      typeHeading.textContent = capitalizeFirstLetter(type);
      pronounsListEl.appendChild(typeHeading);
      
      for (const [pronoun, count] of typeEntries) {
        const item = document.createElement('div');
        item.classList.add('analysis-item');
        item.innerHTML = `
          <span class="item-name">${pronoun}</span>
          <span class="item-count">${count}</span>
        `;
        pronounsListEl.appendChild(item);
      }
    }
  }
  
  // Update prepositions panel
  const prepositionsListEl = document.getElementById('prepositions-list');
  prepositionsListEl.innerHTML = '';
  
  const prepositionEntries = Object.entries(prepositionCounts).sort((a, b) => b[1] - a[1]);
  for (const [preposition, count] of prepositionEntries) {
    const item = document.createElement('div');
    item.classList.add('analysis-item');
    item.innerHTML = `
      <span class="item-name">${preposition}</span>
      <span class="item-count">${count}</span>
    `;
    prepositionsListEl.appendChild(item);
  }
  
  // Update articles panel
  const articlesListEl = document.getElementById('articles-list');
  articlesListEl.innerHTML = '';
  
  // Count of each article
  for (const article of articles) {
    const count = articleCounts[article] || 0;
    const item = document.createElement('div');
    item.classList.add('analysis-item');
    item.innerHTML = `
      <span class="item-name">${article}</span>
      <span class="item-count">${count}</span>
    `;
    articlesListEl.appendChild(item);
  }
  
  // Total count of articles
  const totalArticles = articles.reduce((sum, article) => sum + (articleCounts[article] || 0), 0);
  const totalItem = document.createElement('div');
  totalItem.classList.add('analysis-item', 'analysis-total');
  totalItem.innerHTML = `
    <span class="item-name"><strong>Total Articles</strong></span>
    <span class="item-count"><strong>${totalArticles}</strong></span>
  `;
  articlesListEl.appendChild(totalItem);
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Export the initTextAnalyzer function for use in other modules
export { initTextAnalyzer };

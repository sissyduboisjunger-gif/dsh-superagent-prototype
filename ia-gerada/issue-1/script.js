const data = {
    revenue: [
        { date: '2024-01-01', amount: 15000, description: 'Venda de produtos', category: 'Vendas' },
        { date: '2024-01-02', amount: 12000, description: 'Serviços', category: 'Serviços' },
        { date: '2024-01-03', amount: 18000, description: 'Consultoria', category: 'Consultoria' },
        { date: '2024-01-04', amount: 9500, description: 'Vendas online', category: 'Vendas' },
        { date: '2024-01-05', amount: 11000, description: 'Licenças', category: 'Outros' },
        { date: '2024-01-06', amount: 14500, description: 'Venda de produtos', category: 'Vendas' },
        { date: '2024-01-07', amount: 13000, description: 'Serviços', category: 'Serviços' },
        { date: '2024-01-08', amount: 16000, description: 'Consultoria', category: 'Consultoria' },
        { date: '2024-01-09', amount: 10500, description: 'Vendas online', category: 'Vendas' },
        { date: '2024-01-10', amount: 12500, description: 'Licenças', category: 'Outros' },
        { date: '2024-01-11', amount: 17000, description: 'Venda de produtos', category: 'Vendas' },
        { date: '2024-01-12', amount: 14000, description: 'Serviços', category: 'Serviços' },
        { date: '2024-01-13', amount: 11500, description: 'Consultoria', category: 'Consultoria' },
        { date: '2024-01-14', amount: 13500, description: 'Vendas online', category: 'Vendas' },
        { date: '2024-01-15', amount: 15500, description: 'Licenças', category: 'Outros' }
    ],
    expenses: [
        { date: '2024-01-01', amount: 5000, description: 'Aluguel', category: 'Fixos' },
        { date: '2024-01-02', amount: 3200, description: 'Salários', category: 'Fixos' },
        { date: '2024-01-03', amount: 1800, description: 'Internet', category: 'Fixos' },
        { date: '2024-01-04', amount: 4500, description: 'Marketing', category: 'Variáveis' },
        { date: '2024-01-05', amount: 2800, description: 'Equipamentos', category: 'Variáveis' },
        { date: '2024-01-06', amount: 3500, description: 'Aluguel', category: 'Fixos' },
        { date: '2024-01-07', amount: 4200, description: 'Salários', category: 'Fixos' },
        { date: '2024-01-08', amount: 2100, description: 'Publicidade', category: 'Variáveis' },
        { date: '2024-01-09', amount: 3800, description: 'Internet', category: 'Fixos' },
        { date: '2024-01-10', amount: 2900, description: 'Equipamentos', category: 'Variáveis' },
        { date: '2024-01-11', amount: 5100, description: 'Aluguel', category: 'Fixos' },
        { date: '2024-01-12', amount: 3600, description: 'Salários', category: 'Fixos' },
        { date: '2024-01-13', amount: 2400, description: 'Marketing', category: 'Variáveis' },
        { date: '2024-01-14', amount: 3100, description: 'Internet', category: 'Fixos' },
        { date: '2024-01-15', amount: 2700, description: 'Equipamentos', category: 'Variáveis' }
    ]
};

let revenueChart;
let profitChart;

function formatCurrency(value) {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function calculateTotals(periodDays) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    
    let totalRevenue = 0;
    let totalExpenses = 0;
    
    data.revenue.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            totalRevenue += item.amount;
        }
    });
    
    data.expenses.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            totalExpenses += item.amount;
        }
    });
    
    return { revenue: totalRevenue, expenses: totalExpenses, profit: totalRevenue - totalExpenses };
}

function updateSummaryCards(periodDays) {
    const totals = calculateTotals(periodDays);
    document.getElementById('totalRevenue').querySelector('.value').textContent = formatCurrency(totals.revenue);
    document.getElementById('totalExpenses').querySelector('.value').textContent = formatCurrency(totals.expenses);
    document.getElementById('profit').querySelector('.value').textContent = formatCurrency(totals.profit);
}

function createRevenueExpenseChart(periodDays) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    
    const labels = [];
    const revenueData = [];
    const expenseData = [];
    
    const groupedData = {};
    
    data.revenue.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            const dateKey = formatDate(item.date);
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = { revenue: 0, expense: 0 };
            }
            groupedData[dateKey].revenue += item.amount;
        }
    });
    
    data.expenses.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            const dateKey = formatDate(item.date);
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = { revenue: 0, expense: 0 };
            }
            groupedData[dateKey].expense += item.amount;
        }
    });
    
    Object.keys(groupedData).sort().forEach(dateKey => {
        labels.push(dateKey);
        revenueData.push(groupedData[dateKey].revenue);
        expenseData.push(groupedData[dateKey].expense);
    });
    
    const ctx = document.getElementById('revenueExpenseChart').getContext('2d');
    
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Receitas',
                    data: revenueData,
                    backgroundColor: '#27ae60',
                    borderRadius: 4
                },
                {
                    label: 'Despesas',
                    data: expenseData,
                    backgroundColor: '#e74c3c',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function createProfitChart(periodDays) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    
    const labels = [];
    const profitData = [];
    
    const groupedData = {};
    
    data.revenue.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            const dateKey = formatDate(item.date);
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = { revenue: 0, expense: 0 };
            }
            groupedData[dateKey].revenue += item.amount;
        }
    });
    
    data.expenses.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate >= cutoffDate) {
            const dateKey = formatDate(item.date);
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = { revenue: 0, expense: 0 };
            }
            groupedData[dateKey].expense += item.amount;
        }
    });
    
    Object.keys(groupedData).sort().forEach(dateKey => {
        labels.push(dateKey);
        profitData.push(groupedData[dateKey].revenue - groupedData[dateKey].expense);
    });
    
    const ctx = document.getElementById('profitChart').getContext('2d');
    
    if (profitChart) {
        profitChart.destroy();
    }
    
    profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Lucro',
                data: profitData,
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function updateTransactionList(periodDays) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    
    const allTransactions = [...data.revenue, ...data.expenses];
    
    const filteredTransactions = allTransactions
        .filter(item => new Date(item.date) >= cutoffDate)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    const tbody = document.getElementById('transactionList');
    tbody.innerHTML = '';
    
    filteredTransactions.forEach(item => {
        const row = document.createElement('tr');
        const valueClass = item.amount > 0 ? 'positive' : 'negative';
        const valueText = formatCurrency(Math.abs(item.amount));
        
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td class="${valueClass}">${valueText}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateDashboard() {
    const periodDays = parseInt(document.getElementById('periodSelect').value);
    updateSummaryCards(periodDays);
    createRevenueExpenseChart(periodDays);
    createProfitChart(periodDays);
    updateTransactionList(periodDays);
}

document.getElementById('refreshBtn').addEventListener('click', updateDashboard);

document.getElementById('periodSelect').addEventListener('change', updateDashboard);

updateDashboard();
window.addEventListener('resize', () => {
    if (revenueChart) revenueChart.resize();
    if (profitChart) profitChart.resize();
});
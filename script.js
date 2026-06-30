 function calculate() 
        {
            const fv = parseFloat(document.getElementById('faceValue').value);
            const cr = parseFloat(document.getElementById('couponRate').value) / 100;
            const n  = parseFloat(document.getElementById('maturity').value);
            const r  = parseFloat(document.getElementById('marketRate').value) / 100;

            if (!fv || !cr || !n || !r) 
            {
                alert('Please fill in all fields!');
                return;
            }

            const coupon = fv * cr;
            let price = 0;
            for (let t = 1; t <= n; t++) 
            {
                price += coupon / Math.pow(1 + r, t);
            }
            price += fv / Math.pow(1 + r, n);

            const totalReturn = coupon * n + (price - fv);

            document.getElementById('bondPrice').textContent = '₹' + price.toFixed(2);
            document.getElementById('couponPayment').textContent = '₹' + coupon.toFixed(2);
            document.getElementById('totalReturn').textContent = '₹' + totalReturn.toFixed(2);
            document.getElementById('showMaturity').textContent =n
            document.getElementById('ytm').textContent = (r * 100).toFixed(2) + '%';
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').style.display = 'block';
            document.getElementById('rightPanel').style.display = 'block';
            if (price > fv) 
            {
                document.getElementById('bondBadge').textContent = 'Premium Bond 🟢';
                document.getElementById('statusTitle').textContent = 'Premium Bond';
                document.getElementById('statusDesc').textContent = 'The market rate is lower than the coupon rate. Therefore the bond trades above face value.';
            } 
            else if (price < fv) 
            {
                document.getElementById('bondBadge').textContent = 'Discount Bond 🔴';
                document.getElementById('statusTitle').textContent = 'Discount Bond';
                document.getElementById('statusDesc').textContent = 'Market rate is higher than the coupon rate. Therefore the bond trades below its face value.';
            } 
            else 
            {
                document.getElementById('bondBadge').textContent = 'Par Bond ⚪';
                document.getElementById('statusTitle').textContent = 'Par Bond';
                document.getElementById('statusDesc').textContent = 'The market rate equals the coupon rate. Therefore the bond trades exactly at its face value.';
            }
            document.getElementById('summaryList').innerHTML = `
            <li>The bond pays an annual coupon of ₹${coupon.toFixed(2)}</li>
            <li>The bond matures in ${n} years and returns ₹${fv} at maturity</li>
            <li>Total return over bond life is ₹${totalReturn.toFixed(2)}</li>
            <li>When market rates rise, bond price falls and vice versa</li>
`;
            drawChart();
        }
        function drawChart(r) 
        {
            const rates = [];
            const prices = [];
            const fv = parseFloat(document.getElementById('faceValue').value);
            const cr = parseFloat(document.getElementById('couponRate').value) / 100;
            const n  = parseFloat(document.getElementById('maturity').value);

            for (let i = 1; i <= 20; i++) 
            {
                const rate = i / 100;
                let price = 0;
                for (let t = 1; t <= n; t++) 
                {
                    price += (fv * cr) / Math.pow(1 + rate, t);
                }
                price += fv / Math.pow(1 + rate, n);
                rates.push(i + '%');
                prices.push(price.toFixed(2));
            }
            const ctx = document.getElementById('bondChart').getContext('2d');
            new Chart(ctx, {
            type: 'line',
            data: 
            {
                labels: rates,
                datasets: 
                [{
                    label: 'Bond Price',
                    data: prices,
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#38bdf8'
                }]
            },
            options: 
            {
                responsive: true,
                plugins: 
                {
                    legend: { display: false }
                },
                scales: 
                {
                    x: 
                    {
                        title: 
                        {
                            display: true,
                            text: 'Market Interest Rate (%)',
                            color: '#94a3b8',
                            font: { size: 12 }
                        },
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: 
                    {
                        title: 
                        {
                            display: true,
                            text: 'Bond Price (₹)',
                            color: '#94a3b8',
                            font: { size: 12 }
                        },
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
        }
function reset() 
    {
        document.getElementById('faceValue').value = '';
        document.getElementById('couponRate').value = '';
        document.getElementById('maturity').value = '';
        document.getElementById('marketRate').value = '';
        document.getElementById('rightPanel').style.display = 'none';
    }
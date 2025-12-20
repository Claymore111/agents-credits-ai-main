from weasyprint import HTML, CSS
from datetime import datetime
from io import BytesIO
import math

# Example data
data = {
    "name": "Michael Chen",
    "monthly_income": 4200,
    "employment_type": "Freelance Web Developer",
    "employment_duration": "2 years",
    "requested_amount": 8000,
    "duration": 24,
    "purpose": "Purchase professional equipment and create home office",
    "credit_history": "Fair - had two late payments last year but caught up quickly, currently at 75% credit utilization, recently paid off a personal loan successfully",
    "existing_debts": "Student loans: $400/month, Credit card: $200/month minimum payment, Car lease: $300/month",
    "motivation": "I need to set up a proper home office with high-end equipment to secure more stable freelance contracts...",
}

# Amortization helpers
def monthly_payment(principal, annual_rate, months):
    if annual_rate == 0:
        return principal / months
    r = annual_rate / 12.0
    return principal * r * (1 + r) ** months / ((1 + r) ** months - 1)

def amortization_schedule(principal, annual_rate, months):
    schedule = []
    balance = principal
    monthly = monthly_payment(principal, annual_rate, months)
    for i in range(1, months + 1):
        interest = balance * (annual_rate / 12.0)
        principal_paid = monthly - interest
        if principal_paid > balance:
            principal_paid = balance
            monthly = interest + principal_paid
        balance -= principal_paid
        schedule.append({
            "period": i,
            "payment": round(monthly, 2),
            "interest": round(interest, 2),
            "principal": round(principal_paid, 2),
            "balance": round(max(balance, 0.0), 2)
        })
    return schedule

# Prepare scenarios
P = float(data["requested_amount"])
n = int(data["duration"])
aprs = [0.06, 0.10, 0.12, 0.15]
scenarios = []
for apr in aprs:
    monthly = monthly_payment(P, apr, n)
    total_paid = monthly * n
    scenarios.append({
        "apr": apr,
        "monthly": round(monthly, 2),
        "total_paid": round(total_paid, 2),
        "total_interest": round(total_paid - P, 2)
    })

selected_apr = 0.12
amort = amortization_schedule(P, selected_apr, n)

# HTML template
html_content = f"""
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  body {{ font-family: Arial, sans-serif; margin: 24px; color: #111; }}
  header {{ display:flex; justify-content:space-between; align-items:center; }}
  h1 {{ margin:0; font-size:20px; }}
  .meta {{ text-align:right; font-size:12px; color:#555; }}
  img.photo {{ width:140px; height:80px; object-fit:cover; border-radius: 10px;  margin-top: 10px; }}
  table {{ width:100%; border-collapse: collapse; margin-top:8px; }}
  th, td {{ padding:8px; border:1px solid #ddd; text-align:left; font-size:13px; }}
  th {{ background:#f7f7f7; }}
  .right {{ text-align:right; }}
  .center {{ text-align:center; }}
  .small {{ font-size:12px; }}
</style>
</head>
<body>
  <header>
    <div>
      <h1>Credit Repayment Plan</h1>
      <div class="small">{data["purpose"]}</div>
    </div>
    <div class="meta">
      Generated: {datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")}<br/>
      <strong>{data["name"]}</strong><br/>
      <img class="photo" src="{data["picture_path"]}" alt="Applicant photo"/>
    </div>
  </header>

  <h3>Applicant info</h3>
  <table>
    <tr><th>Name</th><td>{data["name"]}</td></tr>
    <tr><th>Employment</th><td>{data["employment_type"]} ({data["employment_duration"]})</td></tr>
    <tr><th>Monthly income</th><td>${data["monthly_income"]:.2f}</td></tr>
    <tr><th>Requested amount</th><td>${data["requested_amount"]:.2f}</td></tr>
    <tr><th>Term</th><td>{data["duration"]} months</td></tr>
    <tr><th>Credit history</th><td class="small">{data["credit_history"]}</td></tr>
    <tr><th>Existing debts</th><td class="small">{data["existing_debts"]}</td></tr>
    <tr><th>Motivation</th><td class="small">{data["motivation"]}</td></tr>
  </table>

  <h3>Scenarios (monthly payment)</h3>
  <table>
    <tr><th>APR</th><th class="center">Monthly payment</th><th class="center">Total paid</th><th class="center">Total interest</th></tr>
"""
for scen in scenarios:
    html_content += f"""
    <tr>
      <td>{scen["apr"]*100:.2f}%</td>
      <td class="right">${scen["monthly"]:.2f}</td>
      <td class="right">${scen["total_paid"]:.2f}</td>
      <td class="right">${scen["total_interest"]:.2f}</td>
    </tr>
    """
html_content += """
  </table>

  <h3>Amortization schedule (for APR {:.2f}%)</h3>
  <table>
    <tr><th>#</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Remaining Balance</th></tr>
""".format(selected_apr*100)

for row in amort:
    html_content += f"""
    <tr>
      <td class="center">{row["period"]}</td>
      <td class="right">${row["payment"]:.2f}</td>
      <td class="right">${row["interest"]:.2f}</td>
      <td class="right">${row["principal"]:.2f}</td>
      <td class="right">${row["balance"]:.2f}</td>
    </tr>
    """
html_content += """
  </table>
</body>
</html>
"""

# Generate PDF
HTML(string=html_content, base_url=".").write_pdf("credit_offer.pdf", stylesheets=[CSS(string='@page { size: A4; margin: 1cm }')])

print("PDF generated: credit_offer.pdf")

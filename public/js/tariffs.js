const body = document.getElementById('tariff-body');

document.getElementById('add-btn').onclick = () => {

  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input class="form-control" value=""></td>
    <td><input class="form-control" type="number" value=""></td>
    <td><button class="btn btn-danger btn-sm remove-btn">Rimuovi</button></td>
  `;
  body.append(row);
  attachRemove(row.querySelector('.remove-btn'));

};

function attachRemove(btn) {
  btn.onclick = () => btn.closest('tr').remove();
}

document.querySelectorAll('.remove-btn').forEach(attachRemove);

document.getElementById('save-btn').onclick = async () => {

  let valid = true;
  const data = Array.from(body.querySelectorAll('tr')).map(r => {
    const inputs = r.querySelectorAll('input');
    const country = inputs[0].value;
    const rate = Number(inputs[1].value);

    // Validazione: rate deve essere >= 0
    if (isNaN(rate) || rate < 0) {
      valid = false;
      inputs[1].classList.add('is-invalid');
    } else {
      inputs[1].classList.remove('is-invalid');
    }

    return { country, rate };
  });

  if (!valid) {
    alert('Inserisci solo numeri maggiori o uguali a zero nelle tariffe.');
    return; // Blocca il salvataggio
  }

  await fetch('/api/tariffs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  location.reload();

};

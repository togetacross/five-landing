// csv.js
export function parseCsv(text) {
  // Small CSV parser: commas, newlines, and quoted fields ("" escape)
  const rows = [];
  let row = [];
  let cur = '';
  let inQuotes = false;

  const pushField = () => {
    row.push(cur);
    cur = '';
  };

  const pushRow = () => {
    // ignore trailing empty line
    if (row.length === 1 && row[0] === '') {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  // Normalize line endings
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const next = s[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ',') {
      pushField();
      continue;
    }

    if (!inQuotes && ch === '\n') {
      pushField();
      pushRow();
      continue;
    }

    cur += ch;
  }

  // flush last field/row
  pushField();
  pushRow();

  return rows;
}

export function csvToObjects(csvText) {
  const rows = parseCsv(csvText);
  if (!rows.length) return [];
  // Normalize headers: trim + give a stable name to empty header cells
  // (Some exports start with a leading comma, producing an empty first header.)
  const headers = rows[0].map((h, idx) => {
    const name = (h || '').trim();
    return name || `__col${idx}`;
  });
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? '').trim();
    });
    return obj;
  });
}

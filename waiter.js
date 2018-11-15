module.exports = function (pool) {

  async function getdaysofweek() {
    let day = await pool.query('select * FROM daysofweek')
    return day.rows;
  };

  async function waiterinfo(nameofwaiter) {
    if (nameofwaiter != '' || nameofwaiter !== undefined) {
      let reviewname = await pool.query('SELECT names From waiter')
      if (reviewname.rowCount > 0) {
        await pool.query('INSERT INTO waiter(names) values(names)', [nameofwaiter])
      }
    }
  }

  async function dayswaiters(setwaiter, setdays) {
    if (reviewnames(setwaiter)) {
      let nameofwaiter = fetchnames(setwaiter)
      let Id_waiter = nameofwaiter.id;
      await pool.query('DELETE FROM chosendays WHERE waiter_id = $1', [Id_waiter]);

      for (const Id_day of setdays) {
        let selectedID = await pool.query('SELECT id From daysofweek WHERE weekday=$1', [Id_day]);
        selectedID = selectedID.rows[0].id
        await pool.query('INSERT INTO chosendays(waiter_id, daysofweek_id) values($1, $2)', [Id_waiter, selectedID]);

      }

    } else {
      await (reviewnames(setwaiter))
      let nameofwaiter = fetchnames(setwaiter)
      let Id_waiter = nameofwaiter.id;
      await pool.query('DELETE FROM chosendays WHERE waiter_id = $1', [Id_waiter]);

      for (const Id_day of setdays) {
        let selectedID = await pool.query('SELECT id From daysofweek WHERE weekday=$1', [Id_day]);
        selectedID = selectedID.rows[0].id
        await pool.query('INSERT INTO chosendays(waiter_id, daysofweek_id) values($1, $2)', [Id_waiter, selectedID]);
      }
    }
  }

  async function reviewnames(nameofwaiter) {
    reviewname = await pool.query('SELECT * FROM waiter WHERE names = $1', [nameofwaiter]);
    if (reviewname.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  async function fetchcheckedays(nameofwaiter) {
    let getdays = await getdaysofweek();
    let getshifts = await pool.query('SELECT waiter.names, daysofweek.weekday FROM chosendays INNER JOIN waiter ON chosendays.waiter_id = waiter.id INNER JOIN daysofweek ON chosendays.daysofweek_id = daysofweek_id where names= $1', [nameofwaiter]);
    let chosenshifts = getshifts.rows;
    for (let getDay of getdays) {
      for (let workshifts of chosenshifts) {
        if (getDay.weekday === workshifts.weekday) {
          getDay['checked'] = 'checked';
        }
      };
    };

    return getdays;
  }

  async function fetchnames(nameofwaiter) {
    let fetchnameofwaiter = await pool.query('SELECT * FROM waiter WHERE names = $1', [nameofwaiter]);
    return fetchnameofwaiter.rows[0];
  }

  async function checkwaiters() {
    let getDays = await getdaysofweek();
    for (const day of getDay) {
      let outcome = await pool.query('SELECT waiter.names as names FROM chosendays INNER JOIN waiter ON chosendays.waiter_id = waiter.id INNER JOIN weekdays ON chosendays.daysofweek_id = daysofweek_id where daysofweek.weekday = $1', [days.weekday]);
      day.waiter = outcome.rows;
    }
    return item;
  }

  async function removewaiter() {
    let deletewaiter = await pool.query('DELETE FROM waiter');
    return deletewaiter.rows;
  }

  return {
    getdaysofweek,
    waiterinfo,
    dayswaiters,
    reviewnames,
    fetchcheckedays,
    fetchnames,
    checkwaiters,
    removewaiter
  }
};
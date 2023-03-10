import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, setOptions, localeEn } from '@mobiscroll/react';
import List from './List';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAppointments } from '../redux/slices/UserReducer';
setOptions({
  locale: localeEn,
  theme: 'ios',
  themeVariant: 'dark',
});

function Calender() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const { oldappoitments } = useSelector((state) => state.userAuth);
  console.log(oldappoitments);
  const [selectedDate, setSelectedDate] = useState(null);
  let getdates = async () => {
    let { data } = await axios.get('http://localhost:5000/book');
    const datearray = data.map((el) => new Date(el.date));
    const newdatearray = datearray.map((el) => {
      dates.push({
        start: el,
        end: new Date(
          el.getFullYear(),
          el.getMonth(),
          el.getDate(),
          el.getHours(),
          el.getMinutes() + 45,
          0
        ),
      });
    });
  };

  useEffect(() => {
    getdates();
  }, []);
  const { userAuth } = useSelector((state) => state);
  const loggeduser = userAuth?.loggeduser.signeduser;
  const addappointment = async () => {
    const sentdate = await selectedDate.toISOString();
    console.log(loggeduser._id);
    const addedappoitment = await axios.post('http://localhost:5000/book', {
      date: sentdate,
      userid: loggeduser._id,
    });
  };

  const handleclick2 = (event) => {
    event.preventDefault();
    dispatch(getAppointments());
  };
  const handleclick = (event) => {
    event.preventDefault();
    addappointment();
  };
  const onPageLoadingDatetime = () => {
    setDatetimeInvalid(dates);
  };

  const min = '2023-03-04T00:00';
  const max = '2023-09-04T00:00';
  const [datetimeLabels, setDatetimeLabels] = React.useState([]);
  const [datetimeInvalid, setDatetimeInvalid] = React.useState([]);

  if (!loggeduser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }
  return (
    <Page className="md-calendar-booking">
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Select date & time</div>
        <Datepicker
          display="inline"
          controls={['calendar', 'timegrid']}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          width={null}
          labels={datetimeLabels}
          invalid={datetimeInvalid}
          onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
          onChange={(event, inst) => setSelectedDate(inst.getVal())}
        />
        <button onClick={handleclick}>book</button>
        <button onClick={handleclick2}>show old appointments</button>
      </div>
      {oldappoitments?.map((el) => (
        <div>{el.date}</div>
      ))}
    </Page>
  );
}

export default Calender;

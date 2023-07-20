import React, {useMemo, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, DateButton, DateText} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DateInput = ({date, onChange: setDate}) => {
  const [show, setShow] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    handleShowDatePicker();
    setDate(currentDate);
  };

  const handleShowDatePicker = () => {
    setShow(!show);
  };

  return (
    <Container>
      <DateButton onPress={handleShowDatePicker}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="calendar"
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
    </Container>
  );
};

export default DateInput;

import styled from 'styled-components';

const PopupTextStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-image: ${props => props.$day === 1 ? 'url("img/day.svg")' : 'url("img/night.svg")'};
  background-position: calc(100% - 20px) calc(100% - 20px);
  background-size: 20%;
  background-repeat: no-repeat;
`;

const H2Styled = styled.h2`
  text-align: center;
`;

const ImgStyled = styled.img`
  width: 50px;
  height: auto;
  object-fit: contain;
`;

const DivRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  padding-right: 30%;
  box-sizing: border-box;
`;

const NameStyled = styled.p`
  font-weight: 600;
  margin: 0;
`;

const DescriptionStyled = styled.p`
  margin: 0;
`;

const PopupInformation = ({ data }) => {
  const { location, current } = data;

  return (
    <PopupTextStyled $day={current.is_day}>
      <H2Styled>{location.country ? location.country + ', ' : ''}{location.region ? location.region + ', ' : ''}{location.name ? location.name : ''}</H2Styled>
      <DivRowStyled>
        <ImgStyled src={current.condition.icon} alt={current.condition.text} title={current.condition.text} />
        <DescriptionStyled>{current.condition.text}</DescriptionStyled>
      </DivRowStyled>
      <DivRowStyled>
        <NameStyled>Temperatura:</NameStyled>
        <DescriptionStyled>{current.temp_c}°C</DescriptionStyled>
      </DivRowStyled>
      <DivRowStyled>
        <NameStyled>Se siente como:</NameStyled>
        <DescriptionStyled>{current.feelslike_c}°C</DescriptionStyled>
      </DivRowStyled>
      <DivRowStyled>
        <NameStyled>Fecha:</NameStyled>
        <DescriptionStyled>{location.localtime.toString().split(' ')[0]}</DescriptionStyled>
      </DivRowStyled>
      <DivRowStyled>
        <NameStyled>Tiempo:</NameStyled>
        <DescriptionStyled>{location.localtime.toString().split(' ')[1]}</DescriptionStyled>
      </DivRowStyled>
    </PopupTextStyled>
  );
};

export default PopupInformation;
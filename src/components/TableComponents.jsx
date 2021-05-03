import styled from 'styled-components';

export const Container = styled.div`
  background: ${({theme}) => theme.colors.secondary};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 5px;
  margin: 50px;
`
export const Row = styled.div`
  color: ${({theme}) => theme.colors.txt};
	text-decoration: none;
	font-weight: bold;
	padding: 10px 20px;
  margin-bottom: 20px;
	border-radius: 5px;
	transition: background 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  

	&:hover {
		background: rgba(255, 255, 255, 0.1);
	}

  p {
    margin-right: 10px;
  }

  span {
    color: white;
  }
`

import styled from 'styled-components'

export const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  width: 200px;
  display: flex;
  text-align: start;
  margin: 0 10px;
`

export const UnorderedLists = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 140px;
`

export const ListItem = styled.li`
  width: 100%;

  & > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 0 0 10px 0;
    padding: 2px 0 0 5px;
    height: 35px;
    background-color: #007bff;
    color: white;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    filter: drop-shadow(3px 3px 3px black);
  }
`
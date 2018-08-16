import styled from "styled-components"
import React from "react"

const modal = ({ showModal, handleClose }) => (component) => (
  <Container
    showModal={showModal}
    onClick={handleClose}
  >
    <Content>
      <div onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </Content>
  </Container>
);

export default modal

const Container = styled.div`
  display: ${ props => props.showModal ? "block" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`
const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgrey;
  padding: 1.5rem 1.5rem;
  width: 30rem;
  border-radius: 0.5rem;
  border: .3rem solid dimgrey;
`

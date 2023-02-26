import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";

export default function Navigation() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Modal edit="w-[90%] h-[34rem] lg:w-[40rem] lg:h-[21.5rem]">
        <ModalHeader>Settings</ModalHeader>
        <ModalBody edit="justify-center">
          hello
        </ModalBody>
      </Modal>
    </>
  );
}

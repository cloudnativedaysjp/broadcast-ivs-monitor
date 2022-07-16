import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { styled } from "@mui/system";
import { css } from "@mui/styled-engine";
import { AppBar, Toolbar, Typography } from "@mui/material";

const RedColor = css({
  color: "red",
});

const Welcome = styled("span")({
  color: "lightblue",
  backgroundColor: "blue",
  padding: 8,
  borderRadius: 4,
});

const Home: NextPage = () => {
  return (
    <div>
      
    </div>
  )
}

export default Home

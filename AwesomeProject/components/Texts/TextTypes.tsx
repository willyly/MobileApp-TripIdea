import React, { FunctionComponent, ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native"
import styled from "styled-components/native";


export interface TextProps {
    textStyle?: StyleProp<TextStyle>
    children: ReactNode
}


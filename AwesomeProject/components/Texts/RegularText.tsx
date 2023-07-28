import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { TextProps } from "./TextTypes"

//components
import { colors } from "../Colors"

const StyledText = styled.Text`
font-size: 35px;
color: ${colors.white};
text-align: left;
`

export const RegularText: FunctionComponent<TextProps> = (props) => {
    return (
        <StyledText style={props.textStyle}>{props.children}</StyledText>
    )
}

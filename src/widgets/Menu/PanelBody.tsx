import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;




const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={entry.initialOpenState}
              className={calloutClass}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>{item.label}</MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        );
      })}

      <div style={{marginLeft:10,marginRight:10,width:"auto"}} >
      <a href="https://rugdoc.io/project/cryptoswap/" target="_blank">
      <img  src={"https://rugdoc.io/assets/2021/05/rugdoc-review-badge-for-light-bg.png"}
     
     style={{width:200}}
     />


      </a>




      <div style={{
        padding: 20,
        background: "lightgreen",
        borderRadius: 10,
        width: 200,

      }}>
        <h4>Rug Doc KYC Enabled</h4>
      </div>
     {/* <a href="" target="_blank"  style={{marginLeft:10,marginRight:10,marginTop:10}}>
   
    <img  src={"https://cswap.app/images/techrate.png"}
      />
      </a> */}
      </div>


   

    </Container>
  );
};

export default PanelBody;

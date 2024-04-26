import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React from "react";

export default ({
  header,
  headerProps,
  footer,
  footerProps,
  arrow = true,
  arrowProps,
  closeProps,
  trigger,
  children,
  bodyProps,
  ...props
}) => {
  return (
    <Popover {...props}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          {arrow ? <PopoverArrow {...arrowProps} /> : undefined}
          {header ? (
            <PopoverHeader {...headerProps}>
              {typeof header == "function" ? header() : header}
            </PopoverHeader>
          ) : undefined}
          <PopoverCloseButton {...closeProps} />
          <PopoverBody {...bodyProps}>{children}</PopoverBody>
          {footer ? (
            <PopoverFooter {...footerProps}>
              {typeof footer == "function" ? footer() : footer}
            </PopoverFooter>
          ) : undefined}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

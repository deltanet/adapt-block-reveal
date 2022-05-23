# adapt-block-reveal

**Block reveal** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension enables blocks to be hidden and revealed within an article.  

## Installation

This extension must be manually installed.

If **Block reveal** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

**Block reveal** is configured at article level (*articles.json*).

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-block-reveal/blob/master/example.json).

### Attributes

The Block reveal attribute group contains values for **_isEnabled**, **_trackCompletion**, **_blockToHide**, and **_blockToReveal**.  

>**_isEnabled** (boolean):  Turns on and off the **Block reveal** extension. Can be set to disable **Block reveal** when not required.  

>**_trackCompletion** (boolean):  Defines whether the button is hidden until the block is complete.  

>**_blockToHide** (object): This `_blockToHide` attributes group stores the properties for the open button. It contains values for **_classes**, **_buttonLocation**, **_number**, **title**, **_icon**, **ariaLabel**, and **_graphic**.  

>>**_classes** (string):  Defines the class name for the button which must be included in the theme.  

>>**_buttonLocation** (string):  Defines where the button will be displayed on the page. Options are `top` and `bottom`.

>>**_number** (string):  Defines the id or the block number that displays first.  

>>**title** (string):  Defines the text for the button on the visible block.  

>>**_icon** (string):  This defines a css class for the icon on the button in the visible block, which must be included in the theme.  

>>**ariaLabel** (string):  This text becomes the open button’s `aria label` attribute.  

>>**_graphic** (object): This `_graphic` attributes group stores the properties for the graphic used as a button. It contains values for **src**, **srcHover**, and **srcVisited**.  

>>>**src** (string): File name (including path) of the image for button's normal state.  

>>>**srcHover** (string): File name (including path) of the image for button's hover state.  

>>>**srcVisited** (string): File name (including path) of the image for button's visited state.  

>**_blockToReveal** (object): This `_blockToReveal` attributes group stores the properties for the close button. It contains values for **_classes**, **_buttonLocation**, **_number**, **title**, **_icon**, **ariaLabel**, and **_graphic**.  

>>**_classes** (string):  Defines the class name for the button which must be included in the theme.  

>>**_buttonLocation** (string):  Defines where the button will be displayed on the page. Options are `top` and `bottom`.

>>**_number** (string):  Defines the id or the block number that is revealed when the button is selected.  

>>**title** (string):  Defines the text for the back button on the hidden block.  

>>**_icon** (string):  This defines a css class for the icon on the button in the hidden block, which must be included in the theme.  

>>**ariaLabel** (string):  This text becomes the close button’s `aria label` attribute.  

>>**_graphic** (object): This `_graphic` attributes group stores the properties for the graphic used as a button. It contains values for **src**, **srcHover**, and **srcVisited**.  

>>>**src** (string): File name (including path) of the image for button's normal state.  

>>>**srcHover** (string): File name (including path) of the image for button's hover state.  

>>>**srcVisited** (string): File name (including path) of the image for button's visited state.  

----------------------------
**Version number:**  5.1.0     
**Framework versions supported:**  5.8+     
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-block-reveal/graphs/contributors)     
**Accessibility support:** yes  
**RTL support:** yes  
**Authoring tool support:** yes  

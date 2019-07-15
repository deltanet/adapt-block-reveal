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

The Block reveal attribute group contains values for **_isEnabled**, **_trackCompletion**, **_blockToHide**, **_blockToReveal**, **_classes**, **_buttonTitle**, **_buttonIcon**, **_buttonGraphic**, and **_ariaLabels**.

>**_isEnabled** (boolean):  Turns on and off the **Block reveal** extension. Can be set to disable **Block reveal** when not required.  

>**_trackCompletion** (boolean):  Defines whether the button is hidden until the block is complete.  

>**_blockToHide** (string):  Defines the id or the block number that displays first.  

>**_blockToReveal** (string):  Defines the id or the block number that is revealed when the button is selected.  

>**_classes** (string):  Defines the class name for the button which must be included in the theme.  

>**_location** (string):  Defines where the button will be displayed on the page. Options are `top` and `bottom`.

>**_buttonTitle** (string):  Defines the text for the button on the visible block.  

>**_buttonBackTitle** (string):  Defines the text for the back button on the hidden block.  

>**_buttonIcon** (object): This `_buttonIcon` attributes group stores the properties for the icon on the button. It contains values for **_isEnabled**, **_icon**, and **_iconBack**.  

>>**_isEnabled** (boolean):  If set to `true`, an icon will be used as the button.  

>**_icon** (string):  This defines a css class for the icon on the button in the visible block, which must be included in the theme.  

>**_iconBack** (string):  This defines a css class for the icon on the button in the hidden block, which must be included in the theme.  

>**_buttonGraphic** (object): This `_buttonGraphic` attributes group stores the properties for the graphic used as a button. It contains values for **_isEnabled**, **src**, **srcHover**, **srcVisited**, and **alt**.  

>>**_isEnabled** (boolean):  If set to `true`, a graphic will be used as the button.  

>>**src** (string): File name (including path) of the image for button's normal state.  

>>**srcHover** (string): File name (including path) of the image for button's hover state.  

>>**srcVisited** (string): File name (including path) of the image for button's visited state.  

>**_ariaLabels** (object): This `_ariaLabels` attributes group stores the accessibility properties for the button. It contains values for **openPopup**, and **closePopup**.  

>>**openPopup** (string):  This text becomes the open button’s `aria label` attribute.  

>>**closePopup** (string):  This text becomes the close button’s `aria label` attribute.  

----------------------------
**Version number:**  2.2.0     
**Framework versions supported:**  2.0.6     
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-block-reveal/graphs/contributors)     
**Accessibility support:** yes  
**RTL support:** yes  
**Authoring tool support:** yes  

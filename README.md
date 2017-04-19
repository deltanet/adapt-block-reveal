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

>**_buttonTitle** (string):  Defines the text for the button.  

>**_buttonIcon** (string):  If the button is an icon, this defines a css class for the icon which must be included in the theme.  

>**_buttonGraphic** (object): This `_buttonGraphic` attributes group stores the properties for the graphic used as a button. It contains values for **_isEnabled**, **src**, **srcHover**, **srcVisited**, and **alt**.  

>>**_isEnabled** (boolean):  If set to `true`, a graphic will be used as the button.  

>>**src** (string): File name (including path) of the image for button's normal state.  

>>**srcHover** (string): File name (including path) of the image for button's hover state.  

>>**srcVisited** (string): File name (including path) of the image for button's visited state.  

>**alt** (string): This text becomes the image’s `alt` attribute.  

>**_ariaLabels** (object): This `_ariaLabels` attributes group stores the accessibility properties for the button. It contains values for **openPopup**.  

>>**openPopup** (string):  This text becomes the button’s `aria label` attribute.  

### Accessibility

**Block reveal** has one element assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaPoupupLabel**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the label text need to be customised, they can be found within the **globals** object in [*properties.schema*](https://github.com/deltanet/adapt-block-reveal/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
No known limitations. 

----------------------------
**Version number:**  2.1.1     
**Framework versions supported:**  2.0.6     
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-block-reveal/graphs/contributors)     
**Accessibility support:** yes  
**RTL support:** yes  
**Authoring tool support:** yes  

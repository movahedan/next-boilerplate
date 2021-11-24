# End Pages

> Pages have their own personality, if they are very dependent to their _app.tsx, they may broke at age if they are very independent, they may get out of control when it's needed. 

A Page should only be using other components, actions, constants, etc. It's not a place for crafting things. But even if we move those things to another place, and don't pay attention to the complexity of those implementations, it is still hard to distinguish between what is page-level and what is component-level.

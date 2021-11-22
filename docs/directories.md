# Directories

## Rules and Conventions

1. Don't do over creating files/directories just because it feels better.
    Every file/directory that we are creating, hide some of the complexity of the project. With large number of files, more codes hide themselves from us and I can't trust a person who hides a lot from me.

2. Relative imports are ugly, absolute ones are cool.

3. Don't do parent importing, even if you are using absolutes.
    This one helps you following one-way-binding of react, not only for the Data entries, but for code architecture. Modules must be independent to one another unless they're connecting some of them, in the edge cases, you can use absolute path of the specific file, but try not to do so.
  
4. Don't do complex directory hierarchies.
    They should not be deeper than 3 levels (from `src`)(`ui` has 4). If you find yourself doing that, either you are doing a very complex thing for a next.js application as a website, or you are taking all of the world into one directory.

5. Don't do novel writing, not in the code. Do it at /home.
    The maximum lines of files should not be more than 100 (excluding comments). Yes I know, I said no hiding, but if you find yourself in such situation, you are putting lots of logic into one file, it might gets messy over time, beside you need to categorize all of that logic, plus, others might get bored when they read it, by the way, is it really need to be that big? Is there any chance to split it into smaller sections?

6. Don't do camel casing, not for files/directories
    The directory names should written in `kebab-case`, for the higher readability, for module, components and pages it should represent the main exported function, or the category of the related files live in the similar directory, is such case, try not to categorize them again in another level of abstraction.

7. Every module should have an index.ts exporting all we need from it.
  
    > a. Modules should written in a way that their interface is clear, simple and easy to use, and they must be clear about it. All of the pieces that are needed for usage must be exported from a file with the same name of it's directory. 
  
    > b. Do not export the utilities that the module created and is using it on it's own. If a utility is as importance as it is needed to be there at the usage time, place it in the main file, show it the respect it deserves.

    > c. When a component gets more complex, it gets bigger. Categorize each difference sections of a component, like `.styles`, `.types`, `.utils` and `.constants`. just like we are doing that for `.test` and `.stories`. I insist to use the regulars, but you are open to use other names.

8. CSS styles should be kept in limited locations.
    Only write CSS style or className in `pages` or `ui`, Otherwise they will be removed while purging. If you want to create an external file for styling, choose `.styles` for the postfix.

9. Do not going business level in `lib` directory. 
    The `lib` directory is a kind of Toolbox we can use in every project, it should be strongly dependent and not contain business level logic in itself. You can use `entry` and `pages` directory for that type of codes.
    By that, I mean the analytics events you're firing, the redux reducers your're using, the configuration you have for API calls to connect to your specific backend, or your endpoints, ...etc.

10. Go modular in testing!
    You can create a `module/test-utilities.test.ts` to keep reusable test scenarios for a module. In addition, you have the `__mocks__` directory to expand!


## Current directory structure
```
[-] docs
[-] jest
[-] cypress
[-] .storybook
[-] .linters
[-] public
[-] src
  [-] entry
    [-] business-level-data-entry
      [-] index.ts
      [-] business-level-data-entry.ts
      [-] business-level-data-entry.test.ts
  [-] lib 
    [-] group-name
    [-] module-name
      [-] index.ts
      [-] module-name.ts
      [-] module-name.test.tsx
      [-] module-name.types.tsx
      [-] module-name.utils.tsx
  [-] __mocks__
  [-] __tests__
    [-] page-route-name.test.ts
  [-] pages
    [-] page-route-name.ts
  [-] types
    [-] global-type-declaration.ts
  [-] ui
    [-] atoms
      [-] index.ts
      [-] component-name
        [-] component-name.tsx
        [-] component-name.test.tsx
        [-] component-name.types.tsx
        [-] component-name.utils.tsx
        [-] component-name.styles.tsx
        [-] component-name.stories.tsx
        [-] index.ts
    [-] molecules
      [-] index.ts
    [-] organism
      [-] index.ts
    [-] templates
      [-] index.ts
    [-] utils
      [-] index.ts
```
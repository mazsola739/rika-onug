# Selenium E2E tests

## Dev notes
- make sure to have the selenium drivers in your path
for firefox (currently used) use:
> npm install -g geckodriver
- for other webdrivers, check which is the preferred way 
  - win: you might need to update path env var, download webdrivers manually or choose other methods 
  - mac:
chrome driver
> brew install --cask chromedriver

enable safari for selenium [remote] usage 
> root safaridriver --enable

## data-testids
example for cards:
> const testId = `${display_name.replace(/ /g, '-')}--${isSelected ? 'selected' : 'not-selected'}`
>
> StyledCard isSelected={isSelected} onClick={handleCardClick} data-testid={testId}> 

example for lobby room buttons
> const testId = buttonText.replace(/ /g, '-')
>
> StyledRoomButton index={index} onClick={onClick} data-testid={testId}>

## selenium drivers
[selenium drivers 114.0.5735.90](http://chromedriver.storage.googleapis.com/index.html?path=114.0.5735.90/)


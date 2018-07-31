import util from '../util';

export const oneHalf = '\u00BD';        //1/2  - 0.50
export const oneQuarter = '\u00BC';     //1/4  - 0.25
export const threeQuarters = '\u00BE';  //3/4  - 0.75
export const oneThird = '\u2153';       //1/3  - 0.333
export const twoThirds = '\u2154';      //2/3  - 0.667
export const oneFifth = '\u2155';       //1/5  - 0.20
export const twoFifths = '\u2156';      //2/5  - 0.40
export const threeFifths = '\u2157';    //3/5  - 0.60
export const fourFifths = '\u2158';     //4/5  - 0.80
export const oneSixth = '\u2159';       //1/6  - 0.167
export const fiveSixths = '\u215A';     //5/6  - 0.833
export const oneEighth = '\u215B';      //1/8  - 0.125
export const threeEighths = '\u215C';   //3/8  - 0.375
export const fiveEighths = '\u215D';    //5/8  - 0.625
export const sevenEighths = '\u215E';   //7/8  - 0.875
export const oneNinth = '\u2151';       //1/9  - 0.111
export const oneTenth = '\u2152';       //1/10 - 0.10

export function calculateFractionalValue(val) {
    let retVal = '';
    let tmpVal = parseFloat(val);
    let wholeComponent = util.format.forDisplay.number.addCommas(Math.floor(tmpVal)).toString();
    let fractionalComponent = (tmpVal - Math.floor(tmpVal)).toString().split('.');
    if (fractionalComponent.length == 2) {
        switch (fractionalComponent[1].substring(0, 4)) {
            case '5':
                retVal = wholeComponent + ' ' + oneHalf;
                break;
            case '25':
                retVal = wholeComponent + ' ' + oneQuarter;
                break;
            case '75':
                retVal = wholeComponent + ' ' + threeQuarters;
                break;
            case '3':
            case '29':
            case '33':
            case '329':
            case '333':
            case '3299':
            case '3329':
            case '3333':
                retVal = wholeComponent + ' ' + oneThird;
                break;
            case '67':
            case '667':
            case '6667':
            case '669':
            case '6699':
            case '6669':
                retVal = wholeComponent + ' ' + twoThirds;
                break;
            case '2':
            case '1999':
            case '2000':
                retVal = wholeComponent + ' ' + oneFifth;
                break;
            case '4':
            case '3999':
            case '4000':
                retVal = wholeComponent + ' ' + twoFifths;
                break;
            case '6':
            case '5999':
            case '6000':
                retVal = wholeComponent + ' ' + threeFifths;
                break;
            case '8':
            case '7999':
            case '8000':
                retVal = wholeComponent + ' ' + fourFifths;
                break;
            case '167':
            case '1670':
                retVal = wholeComponent + ' ' + oneSixth;
                break;
            case '833':
            case '8330':
                retVal = wholeComponent + ' ' + fiveSixths;
                break;
            case '125':
                retVal = wholeComponent + ' ' + oneEighth;
                break;
            case '375':
                retVal = wholeComponent + ' ' + threeEighths;
                break;
            case '625':
                retVal = wholeComponent + ' ' + fiveEighths;
                break;
            case '875':
                retVal = wholeComponent + ' ' + sevenEighths;
                break;
            case '11':
            case '09':
            case '111':
            case '109':
            case '1111':
            case '1109':
                retVal = wholeComponent + ' ' + oneNinth;
                break;
            case '1':
            case '10':
            case '100':
            case '1000':
                retVal = wholeComponent + ' ' + oneTenth;
                break;
            default:
                retVal = wholeComponent + '.' + fractionalComponent[1];
        }
    } else {
        retVal = wholeComponent;
    }
    return retVal;
}
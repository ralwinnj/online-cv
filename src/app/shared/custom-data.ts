import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class CustomData {
    // 1.
    public static province = [
        { id: 0, label: 'Eastern Cape' },
        { id: 1, label: 'Free State' },
        { id: 2, label: 'Gauteng' },
        { id: 3, label: 'KwaZulu-Natal' },
        { id: 4, label: 'Limpopo' },
        { id: 5, label: 'Mpumalanga' },
        { id: 6, label: 'Nothern Cape' },
        { id: 7, label: 'North West' },
        { id: 8, label: 'Western Cape' }
    ];

    // 2.
    public static country = [
        { id: 0, label: 'South Africa' },
        { id: 1, label: 'Algeria' },
        { id: 2, label: 'Angola' },
        { id: 3, label: 'Benin' },
        { id: 4, label: 'Botswana' },
        { id: 5, label: 'Burkina Faso' },
        { id: 6, label: 'Burundi' },
        { id: 7, label: 'Cabo Verde' },
        { id: 8, label: 'Cameroon' },
        { id: 9, label: 'Central African Republic (CAR)' },
        { id: 10, label: 'Chad' },
        { id: 11, label: 'Comoros' },
        { id: 12, label: 'Congo, Democratic Republic of the' },
        { id: 13, label: 'Congo, Republic of the' },
        { id: 14, label: 'Cote dIvoire' },
        { id: 15, label: 'Djibouti' },
        { id: 16, label: 'Egypt' },
        { id: 17, label: 'Equatorial Guinea' },
        { id: 18, label: 'Eritrea' },
        { id: 19, label: 'Eswatini (formerly Swaziland)' },
        { id: 20, label: 'Ethiopia' },
        { id: 21, label: 'Gabon' },
        { id: 22, label: 'Gambia' },
        { id: 23, label: 'Ghana' },
        { id: 24, label: 'Guinea' },
        { id: 25, label: 'Guinea-Bissau' },
        { id: 26, label: 'Kenya' },
        { id: 27, label: 'Lesotho' },
        { id: 28, label: 'Liberia' },
        { id: 29, label: 'Libya' },
        { id: 30, label: 'Madagascar' },
        { id: 31, label: 'Malawi' },
        { id: 32, label: 'Mali' },
        { id: 33, label: 'Mauritania' },
        { id: 35, label: 'Mauritius' },
        { id: 36, label: 'Morocco' },
        { id: 37, label: 'Mozambique' },
        { id: 38, label: 'Namibia' },
        { id: 39, label: 'Niger' },
        { id: 40, label: 'Nigeria' },
        { id: 41, label: 'Rwanda' },
        { id: 42, label: 'Sao Tome and Principe' },
        { id: 43, label: 'Senegal' },
        { id: 44, label: 'Seychelles' },
        { id: 45, label: 'Sierra Leone' },
        { id: 46, label: 'Somalia' },
        { id: 48, label: 'South Sudan' },
        { id: 49, label: 'Sudan' },
        { id: 50, label: 'Tanzania' },
        { id: 51, label: 'Togo' },
        { id: 52, label: 'Tunisia' },
        { id: 53, label: 'Uganda' },
        { id: 54, label: 'Zambia' },
        { id: 55, label: 'Zimbabwe' },
    ];

    // 3.
    public static gender = [
        { id: 0, label: 'Male' },
        { id: 1, label: 'Female' }
    ];

    // 4.
    public static race = [
        { id: 0, label: 'Black' },
        { id: 1, label: 'Colored' },
        { id: 2, label: 'White' },
        { id: 3, label: 'Asian' },
        { id: 4, label: 'Indian' }
    ];

    // 5.
    public static disability = [
        { id: 0, label: 'No' },
        { id: 1, label: 'Yes' }
    ]

    // 6.
    public static disabilityNature = [
        { id: 0, label: 'Diabetic' },
        { id: 1, label: 'Hearing impediment' },
        { id: 2, label: 'Loss of limb' },
        { id: 3, label: 'Mentally disabled' },
        { id: 4, label: 'Paraplegic' },
        { id: 5, label: 'Quadriplegic' },
        { id: 6, label: 'Visual impediment' },
        { id: 7, label: 'Other' }
    ];

    // 7.
    public static qualifications = [
        { id: 0, label: 'Matric' },
        { id: 1, label: 'Certificate' },
        { id: 2, label: 'N1' },
        { id: 3, label: 'N2' },
        { id: 4, label: 'N3' },
        { id: 5, label: 'N4' },
        { id: 6, label: 'N5' },
        { id: 7, label: 'N6' },
        { id: 8, label: 'Diploma' },
        { id: 9, label: 'Bachelors' },
        { id: 10, label: 'Masters' },
        { id: 11, label: 'Honors' },
        { id: 12, label: 'Doctorate' },
    ]

    // 8.
    public static employmentStatus = [
        { id: 0, label: 'Employed' },
        { id: 1, label: 'Unemployed' },
    ]

    public static relationship = [
        { id: 0, label: 'Citizen' },
        { id: 1, label: 'Current Employee' },
    ]

    // 9.
    public static citizenship = [
        { id: 0, label: 'South African citizen' },
        { id: 1, label: 'Not a South African citizen' }
    ]

    public static title = [
        { id: 0, label: "" }
    ]

    public static skills = [
        { id: 0, label: 'MS Word' },
        { id: 1, label: 'MS PowerPoint' },
        { id: 2, label: 'MS Excel' },
        { id: 3, label: 'MS Outlook' },
        { id: 4, label: 'Other' },
    ]

    public static competencies = [
        { id: 0, label: 'Beginner' },
        { id: 1, label: 'Intermediate' },
        { id: 2, label: 'Advanced' },
    ]

    constructor(public modalService: NgbModal) {

    }

    public static getValue(type, id) {
        switch (type.toLowerCase()) {
            case 'province':
                return this.province.find(e => e.id === parseInt(id));
                break;
            case 'country':
                return this.country.find(e => e.id === parseInt(id));
                break;
            case 'gender':
                return this.gender.find(e => e.id === parseInt(id));
                break;
            case 'race':
                return this.race.find(e => e.id === parseInt(id));
                break;
            case 'disability':
                return this.disability.find(e => e.id === parseInt(id));
                break;
            case 'disabilitynatuture':
                return this.disabilityNature.find(e => e.id === parseInt(id));
                break;
            case 'qualifications':
                return this.qualifications.find(e => e.id === parseInt(id));
                break;
            case 'employmentstatus':
                return this.employmentStatus.find(e => e.id === parseInt(id));
                break;
            case 'relationship':
                return this.relationship.find(e => e.id === parseInt(id));
                break;
            default:
                return;
        }
    }



    createLoginSample = {
        idNumber: '9112075215123',
    }

    constructUrlParams(obj: { foreach: (arg0: (el: any, i: any, o: any) => void) => void; }) {
        let urlParamString: string = '';
        /**
         * obj - should be:
         * obj = [
         *      {
         *          paramName: '',
         *          paramValue: ''
         *      }
         * ]
         */

        /**
         * el = current element in array
         * i = index  of current element in array
         * o = copy of object
         */

        obj.foreach((el: { paramName: any; paramValue: any; }, i: number, o: any) => {
            if (i === 0) {
                // beginning of query string must always start with a "?"
                urlParamString = `?${el.paramName}=${el.paramValue}`;
            } else {
                // additional query string params must always start with a "&"
                urlParamString = `&${el.paramName}=${el.paramValue}`;
            }
        });
        return urlParamString;
    }



}

/**
 * The always up-to-date list of countries of Africa in alphabetical order
				'Matric',
      'Certificate',
      'N 1',
      'N 2',
      'N 3',
      'N 4',
      'N 5',
      'N 6',
      'Diploma',
      'Bachelors',
      'Masters',
      'Honours',
      'Doctorate',


 */
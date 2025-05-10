const { getAllRequirements, addRequirement, updateRequirement, deleteRequirement } = require('../controllers/requirementController');
const Requirement = require('../models/requirementModel');
const mongoose = require('mongoose');
const { getAllCandidates, addCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidateController');
const Candidate = require('../models/candidateModel');
const userController = require('../controllers/userController');
const User = require('../models/userModel');
const { validateToken } = require('../authUtils');
describe('getAllRequirements_Test', () => {
  test('backend_getallrequirements_in_requirementcontroller_should_return_200_status_code_when_requirements_are_found', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.find = jest.fn().mockResolvedValue([{ _id: new mongoose.Types.ObjectId(), title: 'Requirement 1' }]);

    await getAllRequirements(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_getallrequirements_in_requirementcontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.find = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await getAllRequirements(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('addRequirement_Test', () => {
  test('backend_addrequirement_in_requirementcontroller_should_return_200_status_code_when_requirement_added_successfully', async () => {
    const req = { body: { title: 'Requirement 1', description: 'Description 1', department: 'Dept 1', postedDate: new Date(), status: 'Open' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.create = jest.fn().mockResolvedValue(req.body);

    await addRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_addrequirement_in_requirementcontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await addRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});

describe('updateRequirement_Test', () => {
  test('backend_updaterequirement_in_requirementcontroller_should_return_200_status_code_when_requirement_updated_successfully', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = {
      params: { id: requirementId },
      body: { title: 'Updated Requirement', description: 'Updated Description', department: 'Updated Dept', postedDate: new Date(), status: 'Closed' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

    await updateRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_updaterequirement_in_requirementcontroller_should_return_404_status_code_when_requirement_not_found', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = { params: { id: requirementId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_updaterequirement_in_requirementcontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = { params: { id: requirementId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndUpdate = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await updateRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteRequirement_Test', () => {
  test('backend_deleterequirement_in_requirementcontroller_should_return_200_status_code_when_requirement_deleted_successfully', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = { params: { id: requirementId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: requirementId });

    await deleteRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_deleterequirement_in_requirementcontroller_should_return_404_status_code_when_requirement_not_found', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = { params: { id: requirementId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await deleteRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_deleterequirement_in_requirementcontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const requirementId = new mongoose.Types.ObjectId();
    const req = { params: { id: requirementId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Requirement.findByIdAndDelete = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await deleteRequirement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});



describe('getAllCandidates_Test', () => {
  test('backend_getallcandidates_in_candidatecontroller_should_return_200_status_code_when_candidates_are_found', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.find = jest.fn().mockResolvedValue([{ _id: new mongoose.Types.ObjectId(), name: 'Candidate 1' }]);

    await getAllCandidates(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_getallcandidates_in_candidatecontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.find = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await getAllCandidates(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});



describe('addCandidate_Test', () => {
  test('backend_addcandidate_in_candidatecontroller_should_return_200_status_code_when_candidate_added_successfully', async () => {
    const req = { body: { name: 'Candidate 1', email: 'candidate1@mail.com', phone: '123456789', educationalQualification: 'Bachelor', experience: '5 years', techStack: 'JavaScript', resumeUrl: 'resume.pdf', applicationDate: new Date(), status: 'Pending' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.create = jest.fn().mockResolvedValue(req.body);

    await addCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_addcandidate_in_candidatecontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await addCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});

describe('updateCandidate_Test', () => {
  test('backend_updatecandidate_in_candidatecontroller_should_return_200_status_code_when_candidate_updated_successfully', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = {
      params: { id: candidateId },
      body: { name: 'Updated Candidate', email: 'updated@mail.com', phone: '987654321', educationalQualification: 'Master', experience: '10 years', techStack: 'Node.js', resumeUrl: 'updated_resume.pdf', applicationDate: new Date(), status: 'Updated' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

    await updateCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_updatecandidate_in_candidatecontroller_should_return_404_status_code_when_candidate_not_found', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = { params: { id: candidateId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_updatecandidate_in_candidatecontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = { params: { id: candidateId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndUpdate = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await updateCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteCandidate_Test', () => {
  test('backend_deletecandidate_in_candidatecontroller_should_return_200_status_code_when_candidate_deleted_successfully', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = { params: { id: candidateId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: candidateId });

    await deleteCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_deletecandidate_in_candidatecontroller_should_return_404_status_code_when_candidate_not_found', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = { params: { id: candidateId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await deleteCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_deletecandidate_in_candidatecontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const candidateId = new mongoose.Types.ObjectId();
    const req = { params: { id: candidateId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Candidate.findByIdAndDelete = jest.fn().mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    await deleteCandidate(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('getUserByEmailAndPassword_Test', () => {
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_200_status_code_when_user_found', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      userName: 'TestUser',
      role: 'user',
      _id: new mongoose.Types.ObjectId()
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userName: user.userName,
      role: user.role,
      token: expect.any(String),
      id: user._id
    });
  });
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
describe('addUser_Test', () => {
  test('backend_add_user_in_usercontroller_should_return_200_status_code_when_user_added_successfully', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'ProgramManager',
        mobile:'9876543212'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockResolvedValue(req.body);

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_add_user_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'ProgramManager',
        mobile:'9876544321'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
  describe('validateToken', () => {
 
    test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_invalidtoken', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue('invalidToken'),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_no_token', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue(null),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('User_Model_Test', () => {
    test('backend_usermodel_should_validate_a_user_with_all_required_fields', async () => {
      const validUserData = {
        userName: 'validUserName',
        email: 'validemail@gmail.com',
        mobile: '9876543212',
        password: 'validpassword',
        role: 'ProgramManager'
      };
  
      const user = new User(validUserData);
  
      await expect(user.validate()).resolves.toBeUndefined();
    });
  
    test('backend_usermodel_should_validate_a_user_with_missing_username', async () => {
      const invalidUserData = {
        email: 'demouser@gmail.com',
        mobile: '9876543212',
        password: 'validpassword',
        role: 'ProgramManager'
      };
  
      const user = new User(invalidUserData);
  
      await expect(user.validate()).rejects.toThrowError();
    });
  
    test('backend_usermodel_should_validate_a_user_with_missing_email', async () => {
      const invalidUserData = {
        userName: 'validUserName',
        mobile: '9876543212',
        password: 'validpassword',
        role: 'ProgramManager'
      };
  
      const user = new User(invalidUserData);
  
      await expect(user.validate()).rejects.toThrowError();
    });
  
    test('backend_usermodel_should_validate_a_user_with_missing_mobile', async () => {
      const invalidUserData = {
        userName: 'validUserName',
        email: 'demouser@gmail.com',
        password: 'validpassword',
        role: 'ProgramManager'
      };
  
      const user = new User(invalidUserData);
  
      await expect(user.validate()).rejects.toThrowError();
    });
  
    test('backend_usermodel_should_validate_a_user_with_missing_password', async () => {
      const invalidUserData = {
        userName: 'validUserName',
        email: 'demouser@gmail.com',
        mobile: '9876543212',
        role: 'ProgramManager'
      };
  
      const user = new User(invalidUserData);
  
      await expect(user.validate()).rejects.toThrowError();
    });
  
    test('backend_usermodel_should_validate_a_user_with_missing_role', async () => {
      const invalidUserData = {
        userName: 'validUserName',
        email: 'demouser@gmail.com',
        mobile: '9876543212',
        password: 'validpassword',
      };
  
      const user = new User(invalidUserData);
  
      await expect(user.validate()).rejects.toThrowError();
    });
  });



describe('Candidate_Model_Test', () => {
  
  test('backend_candidatemodel_should_validate_a_candidate_with_all_required_fields', async () => {
    const validCandidateData = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      educationalQualification: 'Bachelor of Engineering',
      experience: '5 years',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      applicationDate: new Date(),
      status: 'Pending'
    };

    const candidate = new Candidate(validCandidateData);

    await expect(candidate.validate()).resolves.toBeUndefined();
  });

  test('backend_candidatemodel_should_validate_a_candidate_with_missing_name', async () => {
    const invalidCandidateData = {
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      educationalQualification: 'Bachelor of Engineering',
      experience: '5 years',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      applicationDate: new Date(),
      status: 'Pending'
    };

    const candidate = new Candidate(invalidCandidateData);

    await expect(candidate.validate()).rejects.toThrowError();
  });

 

  test('backend_candidatemodel_should_validate_a_candidate_with_missing_educationalQualification', async () => {
    const invalidCandidateData = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      experience: '5 years',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      applicationDate: new Date(),
      status: 'Pending'
    };

    const candidate = new Candidate(invalidCandidateData);

    await expect(candidate.validate()).rejects.toThrowError();
  });

  test('backend_candidatemodel_should_validate_a_candidate_with_missing_experience', async () => {
    const invalidCandidateData = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      educationalQualification: 'Bachelor of Engineering',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      applicationDate: new Date(),
      status: 'Pending'
    };

    const candidate = new Candidate(invalidCandidateData);

    await expect(candidate.validate()).rejects.toThrowError();
  });


  test('backend_candidatemodel_should_validate_a_candidate_with_missing_applicationDate', async () => {
    const invalidCandidateData = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      educationalQualification: 'Bachelor of Engineering',
      experience: '5 years',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      status: 'Pending'
    };

    const candidate = new Candidate(invalidCandidateData);

    await expect(candidate.validate()).rejects.toThrowError();
  });

  test('backend_candidatemodel_should_validate_a_candidate_with_missing_status', async () => {
    const invalidCandidateData = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '9876543212',
      educationalQualification: 'Bachelor of Engineering',
      experience: '5 years',
      techStack: 'JavaScript, Node.js',
      resumeUrl: 'https://8080-babeebebacfcbeadacbeabccbfbecbdaff.premiumproject.examly.io/resume.pdf',
      applicationDate: new Date()
    };

    const candidate = new Candidate(invalidCandidateData);

    await expect(candidate.validate()).rejects.toThrowError();
  });
});


describe('Requirement_Model_Test', () => {
  
  test('backend_requirementmodel_should_validate_a_requirement_with_all_required_fields', async () => {
    const validRequirementData = {
      title: 'Software Engineer',
      description: 'Requirement for a full-stack software engineer',
      department: 'Engineering',
      postedDate: new Date(),
      status: 'Open'
    };

    const requirement = new Requirement(validRequirementData);

    await expect(requirement.validate()).resolves.toBeUndefined();
  });

  test('backend_requirementmodel_should_validate_a_requirement_with_missing_title', async () => {
    const invalidRequirementData = {
      description: 'Requirement for a full-stack software engineer',
      department: 'Engineering',
      postedDate: new Date(),
      status: 'Open'
    };

    const requirement = new Requirement(invalidRequirementData);

    await expect(requirement.validate()).rejects.toThrowError();
  });

  test('backend_requirementmodel_should_validate_a_requirement_with_missing_description', async () => {
    const invalidRequirementData = {
      title: 'Software Engineer',
      department: 'Engineering',
      postedDate: new Date(),
      status: 'Open'
    };

    const requirement = new Requirement(invalidRequirementData);

    await expect(requirement.validate()).rejects.toThrowError();
  });

  test('backend_requirementmodel_should_validate_a_requirement_with_missing_department', async () => {
    const invalidRequirementData = {
      title: 'Software Engineer',
      description: 'Requirement for a full-stack software engineer',
      postedDate: new Date(),
      status: 'Open'
    };

    const requirement = new Requirement(invalidRequirementData);

    await expect(requirement.validate()).rejects.toThrowError();
  });

  test('backend_requirementmodel_should_validate_a_requirement_with_missing_postedDate', async () => {
    const invalidRequirementData = {
      title: 'Software Engineer',
      description: 'Requirement for a full-stack software engineer',
      department: 'Engineering',
      status: 'Open'
    };

    const requirement = new Requirement(invalidRequirementData);

    await expect(requirement.validate()).rejects.toThrowError();
  });

  test('backend_requirementmodel_should_validate_a_requirement_with_missing_status', async () => {
    const invalidRequirementData = {
      title: 'Software Engineer',
      description: 'Requirement for a full-stack software engineer',
      department: 'Engineering',
      postedDate: new Date()
    };

    const requirement = new Requirement(invalidRequirementData);

    await expect(requirement.validate()).rejects.toThrowError();
  });

});


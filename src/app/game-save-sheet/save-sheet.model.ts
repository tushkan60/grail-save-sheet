export class SaveSheet {
  constructor(
    public gameName: string,
    public menhirs: {
      firstMenhir: { location: string; dialValue: string };
      secondMenhir: { location: string; dialValue: string };
      thirdMenhir: { location: string; dialValue: string };
    },
    public missions: {
      firstMission: { location: string; dialValue: string };
      secondMission: { location: string; dialValue: string };
    },
    public guardians: { firstGuardian: string; secondGuardian: string },
    public notes: string
  ) {}
}

from app.database import engine, Base
from app.models.user import User
from app.models.job import Job, JobRequirement, JobApplication

# Drop the jobs tables so we can recreate them with the new schema
print("Dropping tables...")
Base.metadata.drop_all(bind=engine, tables=[
    JobApplication.__table__,
    JobRequirement.__table__,
    Job.__table__
])

print("Recreating tables...")
Base.metadata.create_all(bind=engine, tables=[
    Job.__table__,
    JobRequirement.__table__,
    JobApplication.__table__
])

print("Done!")
